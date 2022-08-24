import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountListService {

  constructor(
    private http: HttpClient
  ) { }

  ;

  listAccount(): Observable<any> {
    const user = {
      "userEmail": localStorage.getItem('userEmail'),
      "password": "Itac1234!"
    }
    return this.http.post( environment.baseUrl+'user/login', user);
  }

  createAccount(user: any): Observable<any> {
    return this.http.post( environment.baseUrl+'account', user);
  }

  deleteAccount(user: any): Observable<any> {
    console.log(user);
    return this.http.delete( environment.baseUrl+'account/'+ user.accountId);
  }
}
