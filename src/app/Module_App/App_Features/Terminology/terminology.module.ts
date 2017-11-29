import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCommonModule, AuthenticateGuard, SysAdminAuthenticateGuard, RouteName } from '../../App_Common';

import { CoreModule, NgTranslateModule, FirebaseModule } from '../../../Module_Core';


import {
    TerminologyComponent, TerminologyService, TermsEditComponent, CategoryFilterComponent,
    EditClientComponent, ManageTermComponent
} from './';


const routes: Routes = [
    {
        path: '', component: TerminologyComponent, canActivate: [AuthenticateGuard, SysAdminAuthenticateGuard],
        children: [
            { path: '', redirectTo: RouteName.TermsEdit, pathMatch: 'full' },
            { path: RouteName.TermsEdit, component: TermsEditComponent, canActivate: [AuthenticateGuard, SysAdminAuthenticateGuard] },
            { path: RouteName.EditClient, component: EditClientComponent, canActivate: [AuthenticateGuard, SysAdminAuthenticateGuard] },
            { path: RouteName.TermsEdit, component: TermsEditComponent, canActivate: [AuthenticateGuard, SysAdminAuthenticateGuard] },
            { path: RouteName.ManageTerm, component: ManageTermComponent, canActivate: [AuthenticateGuard, SysAdminAuthenticateGuard] }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, NgTranslateModule, FormsModule, ReactiveFormsModule,
        CoreModule, AppCommonModule, FirebaseModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [TerminologyComponent, TermsEditComponent, CategoryFilterComponent, EditClientComponent, ManageTermComponent],
    providers: [
        TerminologyService
        // AngularFirestore
    ],
})

export class TerminologyModule { }
