import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NavigationEnd, Router} from '@angular/router';
import {AddGroceryListComponent} from '../add-grocery-list/add-grocery-list.component';
import {DataService} from '../services/data.service';

@Component({
  selector: 'rideco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideCloseButton = true;
  hideAddListButton = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog) { }

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
      }
    });
  }

  openAddNewListDialog(): void {
    const dialogRef = this.dialog.open(AddGroceryListComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SUCCESS') {
        this.dataService.loadGroceryLists();
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

}
