import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string = environment.apiBaseUrl;
  public loginTimeoutMilliseconds: number = environment.loginTimeoutMilliseconds;

  constructor(
    private httpClient: HttpClient
    //, private toastr: ToastrService
  ) {
  }

  public POST<TIn, TOut>(url: string, model: TIn): Observable<TOut> {
    let fullUrl = this.baseUrl + url;
    let bodyParams = JSON.stringify(model);
    let response = this.httpClient.post<TOut>(fullUrl, bodyParams)
      .pipe(retry(2), timeout(this.loginTimeoutMilliseconds),
        catchError(e => {
          this.handleError(e);
          return of(null);
        }));
    return response;
  }

  public PUT<TIn, TOut>(url: string, model: TIn): Observable<TOut> {
    let fullUrl = this.baseUrl + url;
    let bodyParams = JSON.stringify(model);
    let response = this.httpClient.put<TOut>(fullUrl, bodyParams)
      .pipe(retry(2), timeout(this.loginTimeoutMilliseconds),
        catchError(e => {
          this.handleError(e);
          return of(null);
        }));
    return response;
  }

  public GET<TOut>(url: string): Observable<TOut> {
    let fullUrl = this.baseUrl + url;
    let response = this.httpClient.get<TOut>(fullUrl)
      .pipe(retry(2), timeout(this.loginTimeoutMilliseconds),
        catchError(e => {
          this.handleError(e);
          return of(null);
        }));
    return response;
  }

  public DELETE<TOut>(url: string): Observable<TOut> {
    let fullUrl = this.baseUrl + url;
    let response = this.httpClient.get<TOut>(fullUrl)
      .pipe(retry(2), timeout(this.loginTimeoutMilliseconds),
        catchError(e => {
          this.handleError(e);
          return of(null);
        }));
    return response;
  }

  private handleError(error: Response) {
    //this.toastr.error(error.statusText, "Error!");
    return throwError(error.statusText);
  }

}
