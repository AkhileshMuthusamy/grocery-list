import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {APIResponse, GroceryList, POSTReqGroceryItem, PUTReqGroceryItem, PUTReqGroceryList} from '../objects/global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL = environment.apiURL;
  
  constructor(private http: HttpClient) { }

  fetchAllGroceryList(): Observable<APIResponse<GroceryList[]>> {
    return this.http.get<APIResponse<GroceryList[]>>(`${this.apiURL}/grocery-list`);
  }

  fetchGroceryList(_id: string): Observable<APIResponse<GroceryList[]>> {
    return this.http.get<APIResponse<GroceryList[]>>(`${this.apiURL}/grocery-list/${_id}`);
  }

  addNewGroceryList(data: GroceryList): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}/grocery-list`, data);
  }

  updateGroceryList(data: PUTReqGroceryList): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.apiURL}/grocery-list`, data);
  }

  deleteGroceryList(_id: string) {
    return this.http.delete<APIResponse<any>>(`${this.apiURL}/grocery-list?_id=${_id}`);
  }

  addItemToGroceryList(data: POSTReqGroceryItem): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}/grocery-item`, data)
  }

  updateItemInGroceryList(data: PUTReqGroceryItem): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.apiURL}/grocery-item`, data)
  }

  deleteItemInGroceryList(_id: string, id: string): Observable<APIResponse<any>> {
    return this.http.delete<APIResponse<any>>(`${this.apiURL}/grocery-item?_id=${_id}&id=${id}`)
  }
}
