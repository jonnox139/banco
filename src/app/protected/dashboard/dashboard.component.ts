import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  styles: [
    `
      * {
        margin: 15px;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  cuentas: any[] = this.usuario.accounts;
  selectedAccount = null;
  transactionId = '123456';
  transactionCode = '123456';
  amount = '200000';
  curAmount = 'COP';
  destinationCellphone = '573166190000';
  customerId = '';
  dispersionId = '';
  flowMovil = false;
  flowWeb = false;
  flowApproved = false;
  operacionSeleccionada = null;
  oldValue = null;

  get usuario() {
    return this.authService.usuario;
  }

  ngOnInit() {
    this.cuentas = this.cuentas.map((e) => {
      return { ...e, selected: false };
    });
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleChecks(e: MatCheckboxChange) {
    var obj = this.cuentas.filter((x) => x.numerocuenta == e.source.name)[0];
    if (obj) {
      if (e.checked) {
        this.selectedAccount = obj;
        this.cuentas = this.cuentas.map((e2) => ({
          ...e2,
          selected: e2.numerocuenta === e.source.name,
        }));
      } else {
        this.selectedAccount = null;
        this.cuentas = this.cuentas.map((e2) => ({ ...e2, selected: false }));
      }
    }
  }

  navAutorizacionTX() {
    localStorage.setItem('tx_ref', '');
    if (this.selectedAccount !== null) {
      localStorage.setItem(
        'selectedAccount',
        JSON.stringify(this.selectedAccount)
      );
      if (this.flowMovil) {
        this.router.navigateByUrl(`/verification/authorize-consent`);
      } else {
        this.router.navigateByUrl(`/verification/authorize-consent`);
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, seleccione una cuenta para poder avanzar',
        timer: 1500,
        showConfirmButton: false,
      });
    }
    //this.router.navigateByUrl('/dashboard');
  }
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
