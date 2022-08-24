import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  get usuario() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  constructor(private http: HttpClient) {}

  /* registro(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { email, password, name };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  } */

  login(email: string, password: string) {
    const url = `${this.baseUrl}user/login`;
    const body = { userEmail: email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.name) {
          localStorage.setItem('user', JSON.stringify(resp));
        }
      }),
      map((resp) => resp.name),
      catchError((err) => of(err.error.msg))
    );
  }

  /*validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        };

        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }*/

  logout() {
    localStorage.clear();
  }

// solicitar envio entre cuentas
  ejecucionTX(user: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'fdd208427d301bd62405109952102ffd66895463ee455b72632e68a6',
      'Authorization': 'Bearer ' + user[0].access_token
    });
    return this.http.post('https://ach-minka-stg.transferenciasinmediatas.com/v1/transfer', user[1], { headers: headers });
  }
  
// solicitud de token generacionTX()
  generacionTX(){
    return this.http.get( environment.baseUrl+'transfer/auth');
  }

}
