import { ActivatedRoute } from "@angular/router";
import { ApprovedTransactionService } from "./approved-transaction.service";
import { catchError, map } from "rxjs/operators";
import { DataDispersion } from "../interfaces/dispersionsResponse";
import Swal from 'sweetalert2';
import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-approved-transaction',
  templateUrl: './approved-transaction.component.html',
  styleUrls: ['./approved-transaction.component.css']
})
export class ApprovedTransactionComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private approvedTransactionService: ApprovedTransactionService) { }

  transactionData: any;
  dataDispersion: DataDispersion[] = [];

  ngOnInit(): void {
    this.executeDispersionById();
  }

  executeDispersionById() {
    this.transactionData = JSON.parse(
      localStorage.getItem('transactionInformation') || '{}'
    );
      this.approvedTransactionService.executeDispersions(this.transactionData.dispersionId).pipe(
        map(response  => {
          this.dataDispersion = response;
        }),
        catchError(error => {
          console.log(error);
          let errorMessage = '';
          if (error?.errors) {
            errorMessage = error.error.errors[0].detail;
          } else {
            errorMessage = 'Error interno en el sistema';
          }
          Swal.fire({
            icon: 'error',
            text: errorMessage,
            confirmButtonText: "Regresar al comercio"
          }).then(result => {
            if (result.isConfirmed) {
              // TODO: Parámetrizar esta url en algún archivo de variables de entorno
              window.location.href = `https://transfiya.com/mobile/bankError?id=${this.transactionData.dispersionId}`;
            }
          });
          return []
        })
      ).subscribe();
  }

  approvedDispersions() {
    this.approvedTransactionService.approvedDispersions(this.transactionData.dispersionId).pipe(
      map(()  => {
        Swal.fire({
          icon: 'error',
          text: 'La dispersión ha sido aprobada con exito',
          confirmButtonText: "Regresar comercio local",
          cancelButtonText: "Regresar al comercio",
        }).then(result => {
          if (result.isConfirmed) {
            window.location.href = `http://localhost:4200/aprobaciones/enviada`;
          } else {
            window.location.href = `https://app-web.sandbox.transfiya.com.co/aprobaciones/enviada`;
          }
        });
      }),
      catchError(error => {
        let errorMessage = '';
        if (error?.errors) {
          errorMessage = error.error.errors[0].detail;
        } else {
          errorMessage = 'Error interno en el sistema';
        }
        Swal.fire({
          icon: 'error',
          text: errorMessage,
          confirmButtonText: "Regresar al comercio"
        }).then(result => {
          if (result.isConfirmed) {
            // TODO: Parámetrizar esta url en algún archivo de variables de entorno
            window.location.href = `https://transfiya.com/mobile/bankError?id=${this.transactionData.dispersionId}`;
          }
        });
        return []
      })
    ).subscribe();
}
}
