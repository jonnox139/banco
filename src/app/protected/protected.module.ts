import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizeConsentComponent } from './authorize-consent/authorize-consent.component';
import { PopUpAuthorizeAccessComponent } from './pop-up-authorize-access/pop-up-authorize-access.component';
import { AccountListComponent } from './account-list/account-list.component';
import { ApprovedTransactionComponent } from './approved-transaction/approved-transaction.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AuthorizeConsentComponent,
    PopUpAuthorizeAccessComponent,
    AccountListComponent,
    ApprovedTransactionComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProtectedModule {}
