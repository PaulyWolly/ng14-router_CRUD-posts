import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private apiSrvc: ApiService
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '37%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.apiSrvc.getProducts()
          .subscribe({
            next: (res) => {
              // reload application to see new product
              window.location.reload();
            },
            error: () => {
              alert('Error occured while opening dialog');
            }
          });
      }
    });
  }

}
