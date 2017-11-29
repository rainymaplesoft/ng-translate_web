import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingModule } from './Module_App/App_Features/App_Landing/landing.module';
import { RouteName } from './Module_App/App_Common/';
import { CoreModule, ExceptionComponent, AppMaterialModule } from './Module_Core/';
import 'hammerjs';
// import { TerminologyModule } from './Module_App/App_Features/Terminology/terminology.module';

const AppRoutes: Route[] = [
  { path: '', redirectTo: RouteName.DefaultRoute, pathMatch: 'full' },
  // { path: RouteName.Home, redirectTo: RouteName.DefaultRoute, pathMatch: 'full' },
  { path: RouteName.Landing, loadChildren: './Module_App/App_Features/App_Landing/landing.module#LandingModule' },
  { path: RouteName.Terminology, loadChildren: './Module_App/App_Features/Terminology/terminology.module#TerminologyModule' },
  { path: RouteName.Exception, component: ExceptionComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
