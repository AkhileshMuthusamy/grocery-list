import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'rideco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideCloseButton = true;
  hideAddListButton = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.hideCloseButton = true;
          this.hideAddListButton = false;
        } else if (event.url.includes('list')) {
          this.hideCloseButton = false;
          this.hideAddListButton = true;

        }
        console.log(event.url)
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

}
