import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PostInterface } from '../../model/post.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts!: PostInterface[];

  displayedColumns: string[] = ["id", "title", "body", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.apiService.getPosts()
      .subscribe({
        next: (res: any) => {
          console.log('Our posts: ', res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (res: any) => {
          alert('Error occurred while fetching posts');
        }
      });
  }

  // onAddPost(row: any) {
  //   this.dialog.open(DialogComponent, {
  //     width: '37%',
  //     data: row
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'save') {
  //       this.getAllPosts();
  //     }
  //   });
  // }


  onEditPost(row: any) {
    this.dialog.open(DialogComponent, {
      width: '37%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllPosts();
      }
    });
  }

  onDeletePost(id: any) {
    let text = "Are you sure you want to delete post " + id + " ?? \nOK or Cancel.";
    if (confirm(text) == true) {
      this.deleteThePost(id);
    }
  }

  deleteThePost(id: any) {
    this.apiService.deletePost(id)
      .subscribe({
        next: (res) => {
          console.log('post deleted');
          this.getAllPosts();
        },
        error: () => {
          alert('Error deeleting post');
        }
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Announce the change in sort state */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
