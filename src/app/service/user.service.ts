import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { tap, catchError } from 'rxjs/operators'

import { URL_API } from '../app.api';
import { TokenReturn } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  constructor(
    private http: HttpClient) {
  }
  login(data): Observable<TokenReturn> {
    //seta o header caso necessário
    this.url = `${URL_API}/oauth/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;',
      'Accept': 'application/json;'
    });
    return this.http.post<TokenReturn>(this.url, data, { headers: headers })
      .pipe(
        tap(s => this.log("Get TOKEN")
        ),
        catchError(this.handleError<TokenReturn>('Get-Token'))
      )
  }

  createUser(data): Observable<User> {
    //seta o header caso necessário
    this.url = `${URL_API}/api/auth/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.post<User>(this.url, data, { headers: headers })
      .pipe(
        tap(s => this.log("-----> Get TOKEN")
        ),
        catchError(this.handleError<User>('Get-Token'))
      )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`HomeService: ${message}`);
  }
}
