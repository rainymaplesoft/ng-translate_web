import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LandingComponent, } from './';
import { AuthenticateGuard } from '../../App_Common/';
import { AppMaterialModule } from '../../../Module_Core';
import { LandingFeatureComponent } from './Feature/feature.component';

const routes: Routes = [{
    path: '', component: LandingComponent, canActivate: [AuthenticateGuard],
}];

@NgModule({
    imports: [AppMaterialModule, CommonModule,
        RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [LandingComponent, LandingFeatureComponent],
    providers: [AuthenticateGuard],
})
export class LandingModule { }
