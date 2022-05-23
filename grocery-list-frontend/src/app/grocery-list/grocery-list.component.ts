import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {GroceryList} from '../objects/global';

@Component({
  selector: 'rideco-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  groceryListData!: GroceryList | { [k: string]: any; };

  groceryListForm!: FormGroup;

  editMode = false;

  constructor(private fb: FormBuilder, private router: Router) {
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

  get f(): any { return this.groceryListForm.controls; }

  updateColor(color: string): void {
    if (color){
      this.groceryListForm.controls['color'].setValue(color);
    }
  }

}
