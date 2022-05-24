import {Component, OnDestroy, OnInit} from '@angular/core';
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

  constructor(
    public dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.loadGroceryLists();
    this.subscription$ = this.dataService.getGroceryLists().subscribe((groceryList: GroceryList[] | null) => {
      if (groceryList) {
        this.data = groceryList;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  openList(list: GroceryList) {
    this.router.navigate(['list', list._id]).then(() => { });
  }

}
