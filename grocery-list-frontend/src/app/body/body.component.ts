import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {GroceryList} from '../objects/global';
import {DataService} from '../services/data.service';

@Component({
  selector: 'rideco-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {

  data!: GroceryList[];
  subscription$!: Subscription;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.dataService.getGroceryLists().subscribe((groceryList: GroceryList[] | null) => {
      if (groceryList) {
        this.data = groceryList;
        console.log(this.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  openList(list: GroceryList) {
    this.router.navigateByUrl('/list', {state: list}).then(() => { });
  }

}
