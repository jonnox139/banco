import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAuthorizeAccessComponent } from '../pop-up-authorize-access/pop-up-authorize-access.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-authorize-consent',
  templateUrl: './authorize-consent.component.html',
  styleUrls: ['./authorize-consent.component.scss'],
})
export class AuthorizeConsentComponent implements OnInit {
  cuentaOrigen = JSON.parse(localStorage.getItem('selectedAccount') || '{}');

  transactionData = JSON.parse(
    localStorage.getItem('transactionInformation') || '{}'
  );
  user = JSON.parse(localStorage.getItem('user') || '{}');
  nombreCuentaOrigen: any = this.cuentaOrigen!.numerocuenta;
  tipoDocumentoOrigen: any;
  numDocumentoOrigen: any;
  BancoOrigen: any;
  nombreCuentaDestino: any;
  tipoDocumentoDestino: any;
  numDocumentoDestino: any;
  BancoDestino: any;
  cantidad: any;
  constructor(
    public AuthorizeConsent: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  celularDestino: any;
  Handle: any;
  celularOrigen: any;
  signer: any;
  transactionId: any;
  curAmount: any;
  transactionCode: any;

  idTransaccion: any = '';

  get usuario() {
    return this.AuthorizeConsent.usuario;
  }

  ngOnInit(): void {
    this.cuentaOrigen.signerhandle 
    const valores = window.location.href;
    if (Object.keys(this.transactionData).length > 0) {
      if (this.transactionData.transactionId) {
        this.transactionId = this.transactionData.transactionId;
      }
      if (this.transactionData.curAmount) {
        this.curAmount = this.transactionData.curAmount;
      }
      if (this.transactionData.destinationCellphone) {
        this.celularDestino = this.transactionData.destinationCellphone;
      }
      if (this.transactionData.transactionCode) {
        this.transactionCode = this.transactionData.transactionCode;
      }
      if (this.transactionData.amount) {
        this.cantidad = this.transactionData.amount;
      }
      if (localStorage.getItem('tx_ref')){
        this.idTransaccion = localStorage.getItem('tx_ref')
      } 
    }
  }

  nacegacion(){
    localStorage.setItem('signerhandle', this.cuentaOrigen.signerhandle );
    localStorage.setItem('celularDestino', this.celularDestino );
    localStorage.setItem('cantidad', this.cantidad );
    this.router.navigate(['verification/authorize-access']);
  }

  autorizacionTX(){
    window.open("http://transfiya.com/mobile/bankOK?id=" + this.idTransaccion);
  }

  
}
