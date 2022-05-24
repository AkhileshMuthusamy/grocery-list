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
    // Close all subscriptions when component gets destroyed to prevent memory leak
    this.subscription$.unsubscribe();
  }

  /**
   * Navigate to view grocery items in the list
   * @param list Instance of grocery list to view
   */
  openList(list: GroceryList) {
    this.router.navigate(['list', list._id]).then(() => { });
  }

}
