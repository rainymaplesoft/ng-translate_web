import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouteName } from './routeName';

import {
    PendingChangesGuard, AuthenticateGuard, StaffAuthenticateGuard, SysAdminAuthenticateGuard
} from './authenticateGuard.service';
import { WidgetEditComponent } from './components/widget-edit/';
import { CoreModule } from '../../Module_Core/core.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        CoreModule
    ],
    exports: [WidgetEditComponent],
    declarations: [WidgetEditComponent],
    providers: [PendingChangesGuard, AuthenticateGuard, StaffAuthenticateGuard, SysAdminAuthenticateGuard],
})
export class AppCommonModule { }
