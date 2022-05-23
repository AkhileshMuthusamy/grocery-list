import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {APIResponse} from '../objects/global';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'rideco-add-grocery-list',
  templateUrl: './add-grocery-list.component.html',
  styleUrls: ['./add-grocery-list.component.scss']
})
export class AddGroceryListComponent implements OnInit {

  isLoading = false;
  newGroceryListForm!: FormGroup;
  
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddGroceryListComponent>,) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.newGroceryListForm = this.fb.group({
      title: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  get f(): any { return this.newGroceryListForm.controls; }

  updateColor(color: string): void {
    if (color) {
      this.newGroceryListForm.controls['color'].setValue(color);
    }
  }

  addNewList(): void {
    this.newGroceryListForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.newGroceryListForm.valid) {
      this.isLoading = true;
      this.api.addNewGroceryList(this.newGroceryListForm.getRawValue()).subscribe({
        next: (res: APIResponse<any>) => {
          if ("data" in res) {
            this.dialogRef.close('SUCCESS');
          }
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
        error: () => {
        }
      });
    }
  }

}
