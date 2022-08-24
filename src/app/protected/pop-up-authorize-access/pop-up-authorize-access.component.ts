import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop-up-authorize-access',
  templateUrl: './pop-up-authorize-access.component.html',
  styleUrls: ['./pop-up-authorize-access.component.scss']
})
export class PopUpAuthorizeAccessComponent {
  valor1: Number | undefined;
  valor2: Number | undefined;
  valor3: Number | undefined;
  valor4: Number | undefined;

  constructor(
    public AuthorizeConsent: AuthService,
    private router: Router
  ) {

  }

  ConsumoTXDestino() {
    this.AuthorizeConsent.generacionTX().subscribe((data) => {
      const datosPrueba = [
        data,
        {
          source: localStorage.getItem('signerhandle'), // wTx1E8joPuBFG2V1akx2pXnFA8L7p2u4Gs
          target: '$' + localStorage.getItem('celularDestino'), // 573185161847 celular
          symbol: '$tin',
          amount: localStorage.getItem('cantidad'), // $100000 monto
          labels: {
            description: 'ACH Web',
            domain: 'tin',
            type: 'SEND',
            sourceChannel: 'APP',
            deviceFingerPrint: {},
          },
        },
      ];
      this.AuthorizeConsent.ejecucionTX(datosPrueba).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          text: 'La Transaccion ha sido aprobada con exito',
          confirmButtonText: "Aceptar"
        }).then(result => {
          if (result.isConfirmed){
            localStorage.setItem('tx_ref', data.labels.tx_ref)
            this.router.navigate(['verification/authorize-consent']);
          }
        });
      })
    });
  }

}
