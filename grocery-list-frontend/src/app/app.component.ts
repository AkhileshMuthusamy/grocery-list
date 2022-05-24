import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'rideco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private title: Title) {
    this.title.setTitle('Grocery List');
    console.log(environment.apiURL);
  }
}
