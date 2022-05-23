import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GroceryList} from '../objects/global';

@Component({
  selector: 'rideco-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  data: GroceryList = {
    _id: '1',
    title: 'Costco',
    color: '#355070',
    items: [
      {
        id: '1',
        name: 'Milk',
        purchased: false
      }
    ]
  }

  groceryListForm!: FormGroup;

  editMode = false;

  constructor(private fb: FormBuilder) {
    this.groceryListForm = this.fb.group({
      _id: [''],
      title: [''],
      color: ''
    });
  }

  ngOnInit(): void {
    this.groceryListForm.patchValue(this.data);
  }

  updateColor(color: string): void {
    if (color){
      this.groceryListForm.controls['color'].setValue(color);
    }
  }

}
