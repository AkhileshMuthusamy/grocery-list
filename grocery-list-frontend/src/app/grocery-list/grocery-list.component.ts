import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {APIResponse, GroceryList, POSTReqGroceryItem, PUTReqGroceryList} from '../objects/global';
import {ApiService} from '../services/api.service';
import {DataService} from '../services/data.service';

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
    this.groceryListForm = this.fb.group({
      _id: [''],
      title: [''],
      color: ['']
    });
  }

  ngOnInit(): void {
    this.subscription$ = this.route.params.subscribe(params => {
      if (params['id']) {
        this.getGroceryList(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get f(): any {return this.groceryListForm.controls;}

  updateColor(color: string): void {
    if (color) {
      this.groceryListForm.controls['color'].setValue(color);
      this.updateGroceryList();
    }
  }

  /**
   * Fetch grocery list by matching the _id
   * @param _id Unique id of grocery list
   */
  getGroceryList(_id: string): void {
    console.log('trigger')
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

  deleteGroceryList(): void {
    if (this.groceryListData?._id) {
      this.isLoading = true;
      this.api.deleteGroceryList(this.groceryListData._id).subscribe({
        next: (res) => {
          if ("error" in res) {
            this.snackBar.open('Unable to delete list', 'Close', {duration: 2000});
            this.isLoading = false;
          }
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      })
    }
  }

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
            this.isLoading = false;
          } else if ("data" in res) {
            if (res.data['modified_count'] > 0) {
              this.getGroceryList(this.groceryListData._id);
            }
          }
        },
        complete: () => {
          this.editMode = false;
          this.isLoading = false;
        }
      })
    }
  }

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
        complete: () => {
          this.editMode = false;
          this.isLoading = false;
        }
      })
    }
  }

}
