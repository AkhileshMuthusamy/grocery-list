import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroceryItem} from '../objects/global';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'rideco-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss']
})
export class GroceryItemComponent implements OnInit {

  @Input()
  item!: GroceryItem;

  @Input()
  listId!: string;

  editMode = false;
  groceryItemForm!: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
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
  }

}
