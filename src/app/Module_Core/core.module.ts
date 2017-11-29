import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgTranslateModule } from './translate.module';
import {
  HttpService, StorageService, JwtAuthService, ToastrService, UrlService, UtilService, LayoutService,
  TooltipModule, AnimationModule, DialogModule, ValidatorService, ExceptionComponent,
  DialogService, TooltipComponent, ToggleComponent, SafeHtmlPipe, FilterOutPipe, FilterPipe,
  AngularFireService
} from './export';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { TranslatePipe } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core/src/translate.pipe';
import { AppMaterialModule } from './material.modual';


const fireConfig = {
  apiKey: 'AIzaSyAibEsyEdtFISxVE52i3GP6AY85QP8jMZw',
  authDomain: 'pcg-edplan-i18n.firebaseapp.com',
  databaseURL: 'https://pcg-edplan-i18n.firebaseio.com',
  projectId: 'pcg-edplan-i18n',
  storageBucket: 'pcg-edplan-i18n.appspot.com',
  messagingSenderId: '187895064797'
};

@NgModule({
  imports: [
    HttpClientModule,
    AppMaterialModule, DialogModule, AnimationModule, TooltipModule, NgTranslateModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFireDatabaseModule, AngularFireAuthModule,
    // TranslatePipe
  ],
  exports: [
    AppMaterialModule, NgTranslateModule,
    TooltipComponent, ToggleComponent, ExceptionComponent,
    SafeHtmlPipe, FilterOutPipe, FilterPipe,
    // TranslatePipe
  ],
  declarations: [
    SafeHtmlPipe, FilterOutPipe, FilterPipe, ExceptionComponent],
  entryComponents: [],
  providers: [HttpService, StorageService, JwtAuthService, ToastrService, UrlService, UtilService,
    LayoutService, ValidatorService, DialogService,
    AngularFireService
  ],
})
export class CoreModule { }

