import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { PostInterface } from '../model/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  posts: PostInterface[] = [];

  public apiUrl = 'http://localhost:8080/posts/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getPosts() {
    return this.http.get<PostInterface[]>('http://localhost:8080/posts');
  }

  deletePost(id: any): Observable<any> {
    console.log('Deleting posts with Id: ', id);
    return this.http.delete(this.apiUrl + id);
  }

  editPost(id: any) {
    console.log('You requested to EDIT the post with Id: ', id);
  }

  // Create new product
  postProduct(data: any) {
    return this.http.post<any>('http://localhost:8080/productList/', data);
  }

  // Create new product
  postPost(data: any) {
    return this.http.post<any>('http://localhost:8080/posts/', data);
  }


  // Get ALL products
  getProducts() {
    return this.http.get<any>('http://localhost:8080/productList/');
  }

  // Update 1 product
  putProduct(data: any, id: number) {
    return this.http.put<any>('http://localhost:8080/productList/' + id, data);
  }

  // Update 1 product
  putPost(data: any, id: number) {
    return this.http.put<any>('http://localhost:8080/posts/' + id, data);
  }

  // Delete 1 product
  deleteProduct(id: number) {
    return this.http.delete('http://localhost:8080/productList/' + id);
  }


}
