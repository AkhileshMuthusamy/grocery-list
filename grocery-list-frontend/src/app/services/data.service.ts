import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse, GroceryList} from '../objects/global';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Loading indicator for data fetch
  private _isGrocerListsLoading = false;

  // Observable to store the data
  private _groceryLists = new BehaviorSubject<GroceryList[] | null>(null);

  constructor(private api: ApiService, private snackBar: MatSnackBar) {
  }

  /** Getter method of loading indicator */
  public get isGrocerListsLoading(): boolean {
    return this._isGrocerListsLoading;
  }

  public getGroceryLists(): Observable<GroceryList[] | null> {
    return this._groceryLists.asObservable();
  }

  /** Fetch grocery lists from API and store in it observable */
  loadGroceryLists(): void {
    this._isGrocerListsLoading = true;
    this.api.fetchAllGroceryList().subscribe({
      next: (res: APIResponse<GroceryList[]>) => {
        if ("data" in res) {
          this._groceryLists.next(res.data);
        }
      },
      complete: () => {
        this._isGrocerListsLoading = false;
      },
      error: (err) => {
        this._isGrocerListsLoading = false;
        this.snackBar.open('Server error :(', 'Close', {duration: 5000});
      }
    });
  }
}
