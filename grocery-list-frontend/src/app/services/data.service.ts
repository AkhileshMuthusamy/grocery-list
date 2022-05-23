import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse, GroceryList} from '../objects/global';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _isGrocerListLoading = false;

  private _groceryList = new BehaviorSubject<GroceryList | null>(null);

  constructor(private api: ApiService) {
    this.loadGroceryList();
  }

  public get isGrocerListLoading(): boolean {
    return this._isGrocerListLoading;
  }

  public getGroceryList(): Observable<GroceryList | null> {
    return this._groceryList.asObservable();
  }

  loadGroceryList(): void {
    this._isGrocerListLoading = true;
    this.api.fetchGroceryList().subscribe({
      next: (res: APIResponse<GroceryList>) => {
        if ("data" in res) {
          this._groceryList.next(res.data);
        }
      },
      complete: () => {
        this._isGrocerListLoading = false;
      },
      error: () => {
        this._isGrocerListLoading = false;
      }
    });
  }
}
