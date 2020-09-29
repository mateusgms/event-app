import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Voucher } from '../models/voucher';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  url = 'https://voucher-app3.herokuapp.com/vouchers';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getVouchers(): Observable<Voucher[]> {
    return this.httpClient
      .get<Voucher[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }
  getVoucherById(id: number): Observable<Voucher> {
    return this.httpClient
      .get<Voucher>(this.url + '/id/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }
  saveVoucher(
    voucher: Voucher,
    userId: number,
    eventId: number
  ): Observable<Voucher> {
    return this.httpClient
      .post<Voucher>(
        this.url + '?userId=' + userId + '&eventId=' + eventId,
        JSON.stringify(voucher),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteVoucher(voucher: Voucher) {
    return this.httpClient
      .delete<Voucher>(this.url + '/id/' + voucher.id, this.httpOptions)
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
