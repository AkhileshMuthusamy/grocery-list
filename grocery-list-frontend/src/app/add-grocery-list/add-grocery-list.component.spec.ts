import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroceryListComponent } from './add-grocery-list.component';

describe('AddGroceryListComponent', () => {
  let component: AddGroceryListComponent;
  let fixture: ComponentFixture<AddGroceryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroceryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
