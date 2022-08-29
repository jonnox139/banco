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
  constructor(
    public AuthorizeConsent: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  acepto: boolean = false;
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

  ngOnInit(): void {}

  nacegacion() {
    this.router.navigate(['verification/transaction-information']);
  }

  autorizacionTX() {}

  goToDashboard() {
    this.router.navigateByUrl("/dashboard")
  }
}
