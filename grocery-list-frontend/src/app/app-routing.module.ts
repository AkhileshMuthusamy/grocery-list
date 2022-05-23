import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyComponent} from './body/body.component';
import {GroceryListComponent} from './grocery-list/grocery-list.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  },
  {
    path: 'list',
    component: GroceryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
