import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {

  transactionId = '';
  transactionCode = '';
  amount = '';
  curAmount = '';
  destinationCellphone = '';
  customerId = '';
  dispersionId = '';
  flowMovil = false;
  flowWeb = false;
  flowApproved = false;

  miFormulario: FormGroup = this.fb.group({
    email: ['pepito@opbank.com', [Validators.required, Validators.email]],
    password: ['Itac1234!', [Validators.required, Validators.minLength(6)]],
  });


  ngOnInit(): void {
    this.validateFlowType();
  }

  validateFlowType() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        localStorage.setItem('transactionInformation', JSON.stringify(params));
      }
      localStorage.setItem('customerId', params.customerId);
      this.flowMovil = params.transactionId != null && params.amount != null && params.curAmount != null && params.destinationCellphone != null;
      this.flowWeb = params.customerId != null;
      this.flowApproved = params.dispersionId != null;
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  login() {
    const { email, password } = this.miFormulario.value;
    localStorage.setItem('userEmail', email)
    this.authService.login(email, password).subscribe((ok) => {
      if (ok) {
        if (this.flowMovil) {
          console.log('Flujo de movil');
          this.router.navigateByUrl(`/dashboard`);
        } else if (this.flowWeb) {
          this.router.navigateByUrl('/verification/account-List');
        } else {
          console.log("flujo de aprobación");
          this.router.navigateByUrl('/verification/approved-transaction');
          // this.router.navigate(['verification/approved-transaction', this.dispersionId]);
        }
      } else {
        Swal.fire('Error', 'Hubo un error iniciando sesión', 'error');
      }
    });
  }
}
