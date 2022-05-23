import { Component } from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'rideco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grocery-list-frontend';

  constructor() {
    console.log(environment.apiURL);
  }

  dele(v: any) {
    console.log(v);
  }
}
