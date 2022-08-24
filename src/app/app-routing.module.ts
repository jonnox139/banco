import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarTokenGuard } from './guards/validar-token.guard';
import { AuthorizeConsentComponent } from './protected/authorize-consent/authorize-consent.component';
import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { PopUpAuthorizeAccessComponent } from './protected/pop-up-authorize-access/pop-up-authorize-access.component';
import {ApprovedTransactionComponent} from "./protected/approved-transaction/approved-transaction.component";
import { AccountListComponent } from './protected/account-list/account-list.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./protected/protected.module').then((m) => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'verification',
    children: [
      {
        path: 'authorize-consent',
        component: AuthorizeConsentComponent,
      },
      {
        path: 'authorize-access',
        component: PopUpAuthorizeAccessComponent,
      },
      {
        path: 'account-List',
        component: AccountListComponent,
      },
      {
        path: 'approved-transaction',
        component: ApprovedTransactionComponent
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
