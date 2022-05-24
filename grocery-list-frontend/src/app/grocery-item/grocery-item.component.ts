import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {GroceryItem, PUTReqGroceryItem} from '../objects/global';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'rideco-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss']
})
export class GroceryItemComponent implements OnInit, OnDestroy {

  // Grocery item object
  @Input()
  item!: GroceryItem;

  // Grocery list id
  @Input()
  listId!: string;

  @Output()
  updated: EventEmitter<boolean> = new EventEmitter();

  isLoading = false;
  editMode = false;
  groceryItemForm!: FormGroup;

  valueChangesSubscription$!: Subscription;
  
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
      // Initialize form
      this.groceryItemForm = this.fb.group({
        _id: [''],
        id: [''],
        name: ['', Validators.required],
        purchased: [false, Validators.required]
      });
  }

  ngOnInit(): void {
    this.groceryItemForm.patchValue(this.item);
    this.groceryItemForm.controls['_id'].setValue(this.listId);

    // Updates the grocery item in backend whenever user toggles the checkbox
    this.valueChangesSubscription$ = this.groceryItemForm.controls['purchased'].valueChanges.subscribe(value => {
      this.updateGroceryItem();
    });
  }

  ngOnDestroy(): void {
    // Close all subscriptions when component gets destroyed to prevent memory leak
    this.valueChangesSubscription$.unsubscribe();
  }

  //** Stores changes of grocery item in the backend */
  updateGroceryItem(): void {
    if (this.listId && this.item?.id) {
      this.isLoading = true;
      this.api.updateItemInGroceryList(this.groceryItemForm.getRawValue()).subscribe({
        next: (res) => {
          if ("error" in res) {
            this.snackBar.open('Unable to update item', 'Close', {duration: 2000});
          } else if ("data" in res) {
            if (res.data['modified_count'] = 0) {
              this.snackBar.open('Unable to update item', 'Close', {duration: 2000});
              this.updated.emit(true);
            }
          }
        },
        error: () => {
          this.isLoading = false;
          // Notify user on API failure
          this.snackBar.open('Unable to update item', 'Close', {duration: 2000});
        },
        complete: () => {
          this.editMode = false;
          this.isLoading = false;
        }
      })
    }
  }

  /** Delete grocery item from the list */
  deleteGroceryItem(): void {
    if (this.listId && this.item?.id) {
      this.isLoading = true;
      this.api.deleteItemInGroceryList(this.listId, this.item.id).subscribe({
        next: (res) => {
          if ("error" in res) {
            this.snackBar.open('Unable to delete item', 'Close', {duration: 2000});
          } else if ("data" in res) {
            if (res.data['modified_count'] > 0) {
              this.updated.emit(true);
            }
          }
        },
        error: () => {
          this.isLoading = false;
          // Notify user on API failure
          this.snackBar.open('Unable to delete item', 'Close', {duration: 2000});
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

}
