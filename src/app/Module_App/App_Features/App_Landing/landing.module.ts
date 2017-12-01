import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreCommonModule } from '../../../Module_Core';

import { LandingComponent, } from './';
import { AuthenticateGuard } from '../../App_Common/';
// import { AppMaterialModule } from '../../../Module_Core';
import { LandingFeatureComponent } from './Feature/feature.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [{
    path: '', component: LandingComponent, canActivate: [AuthenticateGuard],
}];

@NgModule({
    imports: [
        CoreCommonModule,
        // CommonModule, AppMaterialModule,
        RouterModule.forChild(routes)],
    exports: [],
    declarations: [LandingComponent, LandingFeatureComponent],
    providers: [AuthenticateGuard],
})
export class LandingModule { }
