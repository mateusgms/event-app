import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
    providedIn: 'root'
})

export class EventService {
    url = 'https://event-app3.herokuapp.com/events';

    constructor(private httpClient: HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'appication/json'})
    };

    getEvents(): Observable<Event[]> {
        return this.httpClient.get<Event[]>(this.url)
          .pipe(
            retry(2),
            catchError(this.handleError));
    }
    getEventById(id: number): Observable<Event> {
        return this.httpClient.get<Event>(this.url + '/id' + id)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
    saveEvent(event: Event): Observable<Event> {
        return this.httpClient.post<Event>(this.url, JSON.stringify(event), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
    updateEvent(event: Event ): Observable<Event>{
        return this.httpClient.put<Event>(this.url + '/id/' + event.id, JSON.stringify(event), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    deleteEvent(event: Event){
        return this.httpClient.delete<Event>(this.url + '/id/' + event.id, this.httpOptions)
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
