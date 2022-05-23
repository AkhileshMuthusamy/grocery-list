import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {GroceryList} from '../objects/global';
import {ApiService} from '../services/api.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'rideco-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  isLoading = false;

  groceryListData!: GroceryList | {[k: string]: any;};

  groceryListForm!: FormGroup;

  editMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dataService: DataService) {
    this.groceryListForm = this.fb.group({
      _id: [''],
      title: [''],
      color: ''
    });


    let stateData = this.router.getCurrentNavigation()?.extras.state;
    if (stateData) {
      this.groceryListData = stateData;
      this.groceryListForm.patchValue(stateData);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  get f(): any {return this.groceryListForm.controls;}

  updateColor(color: string): void {
    if (color) {
      this.groceryListForm.controls['color'].setValue(color);
    }
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
          this.dataService.loadGroceryList();
        }
      })
    }
  }

}
