import { Component, OnInit } from '@angular/core';
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
    color: '#d3e4f0',
    items: [
      {
        id: '1',
        name: 'Milk',
        purchased: false
      }
    ]
  }
  constructor() { }

  ngOnInit(): void {
  }

}
