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
    // Switch between 'Add list' and 'Close' button based on route
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

  // Open dialog box to add new list
  openAddNewListDialog(): void {
    const dialogRef = this.dialog.open(AddGroceryListComponent, {
      width: '350px'
    });

    // Reload data when dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SUCCESS') {
        this.dataService.loadGroceryLists();
      }
    });
  }

  // Navigate to home route
  navigateHome(): void {
    this.router.navigate(['/']);
  }

}
