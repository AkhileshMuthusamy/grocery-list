import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from '@angular/core/testing';
import {environment} from "src/environments/environment";
import {GroceryList} from '../objects/global';
import {ApiService} from './api.service';

describe('ApiService', () => {
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  // it('should get all grocery list from http', () => {
  //   // ARRANGE
  //   const groceryList: GroceryList[] = [
  //     {
  //         "_id": "628c76fc1bf6b827d3539d1d",
  //         "color": "#355070",
  //         "items": [
  //             {
  //                 "id": "628c77271bf6b827d3539d20",
  //                 "name": "🍞 Bread",
  //                 "purchased": true
  //             },
  //             {
  //                 "id": "628c77361bf6b827d3539d22",
  //                 "name": "🍎 Apple",
  //                 "purchased": true
  //             },
  //             {
  //                 "id": "628c9ae148b6b3d86139e0de",
  //                 "name": "🍰 Cake",
  //                 "purchased": false
  //             }
  //         ],
  //         "last_updated": "2022-05-24T16:44:11Z",
  //         "title": "Walmart"
  //     },
  //     {
  //         "_id": "628c77071bf6b827d3539d1e",
  //         "color": "#6D597A",
  //         "items": [
  //             {
  //                 "id": "628c77501bf6b827d3539d23",
  //                 "name": "🧈 Butter",
  //                 "purchased": true
  //             },
  //             {
  //                 "id": "628c9a8c48b6b3d86139e0dd",
  //                 "name": "🍅 Tomatoes ",
  //                 "purchased": false
  //             }
  //         ],
  //         "last_updated": "2022-05-24T16:44:23Z",
  //         "title": "FreshCo"
  //     }
  //   ];

  //   // ACT
  //   apiService.fetchAllGroceryList().subscribe(res => {
  //     // expect(res.data.length).toBe(2);
  //     expect(res.data).toEqual(groceryList);
  //   });

  //   // HTTP Mock
  //   const req = httpMock.expectOne(`${environment.apiURL}/grocery-list`);
  //   expect(req.request.method).toBe("GET");
  //   req.flush(groceryList);

  //   httpMock.verify();
  // });
});
