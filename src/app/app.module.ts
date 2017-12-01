import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import 'hammerjs';

import { AppComponent } from './app.component';
import { RouteName } from './Module_App/App_Common/';
import { CoreServiceModule, CoreCommonModule, ExceptionComponent, FirebaseModule } from './Module_Core/';

const AppRoutes: Route[] = [
  { path: '', redirectTo: RouteName.DefaultRoute, pathMatch: 'full' },
  { path: RouteName.Landing, loadChildren: './Module_App/App_Features/App_Landing/landing.module#LandingModule' },
  { path: RouteName.Terminology, loadChildren: './Module_App/App_Features/Terminology/terminology.module#TerminologyModule' },
  { path: RouteName.Exception, component: ExceptionComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    CoreCommonModule,
    CoreServiceModule.forRoot(),
    FirebaseModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
