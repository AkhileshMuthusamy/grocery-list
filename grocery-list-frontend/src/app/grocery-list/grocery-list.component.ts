import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {APIResponse, GroceryList, POSTReqGroceryItem, PUTReqGroceryList} from '../objects/global';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'rideco-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit, OnDestroy {

  isLoading = false;
  editMode = false;
  groceryListData!: GroceryList;
  groceryListForm!: FormGroup;
  newItem: FormControl = new FormControl();

  private subscription$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private snackBar: MatSnackBar) {
      // Initialize form
      this.groceryListForm = this.fb.group({
        _id: [''],
        title: [''],
        color: ['']
      });
  }

  ngOnInit(): void {
    // Receive grocery item id from the route parameter and load the data from API
    this.subscription$ = this.route.params.subscribe(params => {
      if (params['id']) {
        this.getGroceryList(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    // Close all subscriptions when component gets destroyed to prevent memory leak
    this.subscription$.unsubscribe();
  }

  get f(): any {return this.groceryListForm.controls;}

  /** Change background-color of the grocery list */
  updateColor(color: string): void {
    if (color) {
      this.groceryListForm.controls['color'].setValue(color);
      this.updateGroceryList();
    }
  }

  /**
   * Fetch grocery items by matching the _id of the grocery list
   * @param _id Unique id of grocery list
   */
  getGroceryList(_id: string): void {
    this.isLoading = true;
    this.api.fetchGroceryList(_id).subscribe({
      next: (res: APIResponse<GroceryList[]>) => {
        if ("data" in res) {
          if (res.data && res.data.length > 0) {
            this.groceryListData = res.data[0];
            this.groceryListForm.patchValue(this.groceryListData);
          }
        }
      },
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  /** Add item to the grocery list */
  addItemToGroceryList(): void {
    if (this.groceryListData?._id && this.newItem.value) {
      this.isLoading = true;
      const reqData: POSTReqGroceryItem = {
        _id: this.groceryListData._id,
        name: this.newItem.value
      }
      this.api.addItemToGroceryList(reqData).subscribe({
        next: (res) => {
          if ("error" in res) {
            this.snackBar.open('Unable to add item to list', 'Close', {duration: 2000});
            this.isLoading = false;
          } else if ("data" in res) {
            if (res.data['modified_count'] > 0) {
              this.getGroceryList(this.groceryListData._id);
              this.newItem.setValue('');
            }
          }
        },
        error: () => {
          this.isLoading = false;
          // Notify user on API failure
          this.snackBar.open('Unable to add item to list', 'Close', {duration: 2000});
        },
        complete: () => {
          this.editMode = false;
          this.isLoading = false;
        }
      })
    }
  }

  /** Update the grocery list title and color */
  updateGroceryList(): void {
    if (this.groceryListData?._id) {
      this.isLoading = true;
      const reqData: PUTReqGroceryList = {
        _id: this.groceryListData._id,
        color: this.f['color'].value,
        title: this.f['title'].value
      }
      this.api.updateGroceryList(reqData).subscribe({
        next: (res) => {
          if ("error" in res) {
            this.snackBar.open('Unable to update list', 'Close', {duration: 2000});
          } else if ("data" in res) {
            if (res.data['modified_count'] > 0) {
              this.getGroceryList(this.groceryListData._id);
            }
          }
        },
        error: () => {
          this.isLoading = false;
          // Notify user on API failure
          this.snackBar.open('Unable to update list', 'Close', {duration: 2000});
        },
        complete: () => {
          this.editMode = false;
          this.isLoading = false;
        }
      })
    }
  }

  /** Delete the grocery list permanently */
  deleteGroceryList(): void {
    if (this.groceryListData?._id) {
      this.isLoading = true;
      this.api.deleteGroceryList(this.groceryListData._id).subscribe({
        next: (res) => {
          if ("error" in res) {
            this.snackBar.open('Unable to delete list', 'Close', {duration: 2000});
          }
        },
        error: () => {
          this.isLoading = false;
          // Notify user on API failure
          this.snackBar.open('Unable to delete list', 'Close', {duration: 2000});
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      })
    }
  }

}
