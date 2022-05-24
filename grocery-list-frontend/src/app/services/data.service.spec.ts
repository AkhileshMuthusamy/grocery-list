import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ApiService} from './api.service';
import {DataService} from './data.service';


describe('DataService', () => {
  let httpMock: HttpTestingController;
  let dataService: DataService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [ApiService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });
});
