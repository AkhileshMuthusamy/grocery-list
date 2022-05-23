import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse, GroceryList} from '../objects/global';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _isGrocerListsLoading = false;

  private _groceryLists = new BehaviorSubject<GroceryList[] | null>(null);

  constructor(private api: ApiService) {
    this.loadGroceryLists();
  }

  public get isGrocerListsLoading(): boolean {
    return this._isGrocerListsLoading;
  }

  public getGroceryLists(): Observable<GroceryList[] | null> {
    return this._groceryLists.asObservable();
  }

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
      error: () => {
        this._isGrocerListsLoading = false;
      }
    });
  }
}
