import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = 'https://event-app3.herokuapp.com/posts';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: '',
    }),
  };

  getPosts(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }
  getPostById(id: number): Observable<Post> {
    return this.httpClient
      .get<Post>(this.url + '/id/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }
  savePost(post: Post, userId: number): Observable<Post> {
    return this.httpClient
      .post<Post>(
        this.url + '?userId=' + userId,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  updatePost(post: Post): Observable<Post> {
    return this.httpClient
      .put<Post>(this.url, JSON.stringify(post), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deletePost(post: Post) {
    return this.httpClient
      .delete<Post>(this.url + '/' + post.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        'Código do erro: ${error.status}, ' + 'menssagem: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
