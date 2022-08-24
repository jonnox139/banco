import { Component, OnInit } from '@angular/core';
import { AccountListService } from 'src/app/auth/services/account-list.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  cuentas: any[] = [];
  selectedAccount = null;
  operacionSeleccionada = null;
  get usuario() {
    return this.authService.usuario;
  }

  fecha: Date = new Date();

  customerId: string | null = '';

  constructor(
    private accountListService: AccountListService,
    private authService: AuthService
  ) { }
  isShow: boolean = true;
  ngOnInit(): void {
    this.getcustomer();
    this.accountListService.listAccount().subscribe(data => {
      this.cuentas = data.accounts;
    })
  }

  getcustomer() {
    this.customerId = localStorage.getItem('customerId');

  }

  DeleteMapping(dateSelect: any) {
    this.accountListService.deleteAccount(dateSelect).subscribe(data => {
      Swal.fire({
        icon: 'success',
        text: 'La Desvinculacion ha sido aprobada con exito',
        confirmButtonText: "Aceptar"
      }).then(result => {
        if(result.isConfirmed){
          this.recargarPantalla();
        }
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        text: 'La Desvinculacion no ha sido aprobada',
        confirmButtonText: "Aceptar"
      });
    }
    )
  }

  postMapping(dateSelect: any) {
    const body = {
      accountId: dateSelect.accountId,
      customerDocumentNumber: this.customerId,
      accountNumber: dateSelect.numerocuenta,
      accountCode: dateSelect.accountCode,
      accountName: dateSelect.name,
      createDt: this.fecha.toISOString() ,
      expirationDt: "2025-08-21T00:00:00",
      status: "1"
    }
    this.accountListService.createAccount(body).subscribe(data => {
      Swal.fire({
        icon: 'success',
        text: 'La Vinculacion ha sido aprobada con exito',
        confirmButtonText: "Aceptar"
      }).then(result => {
        if(result.isConfirmed){
          this.recargarPantalla();
        }
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        text: 'La Vinculacion no ha sido aprobada',
        confirmButtonText: "Aceptar"
      });
    })
  }

  recargarPantalla(){
    this.cuentas = this.usuario.accounts;
    window.location.reload();
  }

  navigateLocal(){
    window.location.href = "http://localhost:4200/mis-cuentas";
  }

  navigateSandbox(){
    window.location.href = "https://app-web.sandbox.transfiya.com.co/mis-cuentas";
    
  }
  
}
