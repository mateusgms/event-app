import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Blog } from '../models/blog';

@Injectable({
    providedIn: 'root'
})

export class BlogService {
    url = 'https://event-app3.herokuapp.com/blogs';

    constructor(private httpClient: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    getBlogs(): Observable<Blog[]> {
        return this.httpClient.get<Blog[]>(this.url)
          .pipe(
            retry(2),
            catchError(this.handleError));
    }
    getBlogById(id: number): Observable<Blog> {
        return this.httpClient.get<Blog>(this.url + '/id/' + id)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
    saveBlog(blog: Blog, userId: number): Observable<Blog> {
        return this.httpClient.post<Blog>(this.url + '?userId=' + userId, JSON.stringify(blog), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
    updateBlog(blog: Blog ): Observable<Blog>{
        return this.httpClient.put<Blog>(this.url, JSON.stringify(blog), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    deleteBlog(blog: Blog){
        return this.httpClient.delete<Blog>(this.url + '/id/' + blog.id, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Erro ocorreu no lado do client
          errorMessage = error.error.message;
        } else {
          // Erro ocorreu no lado do servidor
          errorMessage = 'Código do erro: ${error.status}, ' + 'menssagem: ${error.message}';
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
