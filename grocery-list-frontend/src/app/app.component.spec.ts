import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have as title 'grocery-list-frontend'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('grocery-list-frontend');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('grocery-list-frontend app is running!');
  // });

  it('should contain header component', () => {
    const { debugElement } = fixture;
    const header = debugElement.query(By.css('rideco-header'));
    expect(header).toBeTruthy();
  });

  it('should contain footer component', () => {
    const { debugElement } = fixture;
    const footer = debugElement.query(By.css('rideco-footer'));
    expect(footer).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    const { debugElement } = fixture;
    const router = debugElement.query(By.css('router-outlet'));
    expect(router).toBeTruthy();
  });


});
