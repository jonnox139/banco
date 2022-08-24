import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DataDispersion} from "../interfaces/dispersionsResponse";
import {pluck} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApprovedTransactionService {

  // TODO: Modificar par la url correcta para DispersionOfFunds
  private baseUrl = environment.baseUrlDispersions;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  executeDispersions(dispersionId: string): Observable<DataDispersion[]> {
    const url = `${this.baseUrl}Dispersions/${dispersionId}`;
    this.headers = new HttpHeaders().append('message-uid', '');
    const headers = this.headers;
    const httpOptions = { headers }
    return this.httpClient.get(url, httpOptions).pipe(
      pluck('data')
    );
  }

  approvedDispersions(dispersionId: string): Observable<any> {
    const url = `${this.baseUrl}Dispersions/${dispersionId}`;
    this.headers = new HttpHeaders().append('message-uid', '');
    const headers = this.headers;
    const httpOptions = { headers }
    const body = {
      status: 'bank_approved',
      sourceAccount: ""
    }
    return this.httpClient.patch(url, body, httpOptions);
  }


}
