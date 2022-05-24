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

  @Input()
  item!: GroceryItem;

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

    this.valueChangesSubscription$ = this.groceryItemForm.controls['purchased'].valueChanges.subscribe(value => {
      this.updateGroceryItem();
    })
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription$.unsubscribe();
  }

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
          this.snackBar.open('Unable to update item', 'Close', {duration: 2000});
        },
        complete: () => {
          this.editMode = false;
          this.isLoading = false;
        }
      })
    }
  }

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
          this.snackBar.open('Unable to delete item', 'Close', {duration: 2000});
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

}
