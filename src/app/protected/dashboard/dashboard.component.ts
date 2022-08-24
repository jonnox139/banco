import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
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
  get usuario() {
    return this.authService.usuario;
  }

  ngOnInit() {
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  radioChange() {
    var obj = this.cuentas.filter(
      (x) => x.numerocuenta == this.operacionSeleccionada
    )[0];
    if (obj) {
      this.selectedAccount = obj;
    }
  }

  navAutorizacionTX() {
    localStorage.setItem('tx_ref', '')
    if (this.selectedAccount !== null) {
      localStorage.setItem(
        'selectedAccount',
        JSON.stringify(this.selectedAccount)
      );
      if (this.flowMovil) {
        this.router.navigateByUrl(
          `/verification/authorize-consent`
        );
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
