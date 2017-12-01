import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

import { RouteName } from './routeName';

import { CoreCommonModule } from '../../Module_Core';
import {
    PendingChangesGuard, AuthenticateGuard, StaffAuthenticateGuard, SysAdminAuthenticateGuard
} from './authenticateGuard.service';
import { WidgetEditComponent } from './components/widget-edit/';

@NgModule({
    imports: [
        // CommonModule, FormsModule, ReactiveFormsModule,
        CoreCommonModule
    ],
    exports: [WidgetEditComponent],
    declarations: [WidgetEditComponent],
    providers: [PendingChangesGuard, AuthenticateGuard, StaffAuthenticateGuard, SysAdminAuthenticateGuard],
})
export class AppCommonModule { }
