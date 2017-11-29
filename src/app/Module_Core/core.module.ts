import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgTranslateModule } from './translate.module';
import {
  HttpService, StorageService, JwtAuthService, ToastrService, UrlService, UtilService, LayoutService,
  TooltipModule, AnimationModule, DialogModule, ValidatorService, ExceptionComponent,
  DialogService, TooltipComponent, ToggleComponent, SafeHtmlPipe, FilterOutPipe, FilterPipe,
} from './export';

import { AppMaterialModule } from './material.modual';



@NgModule({
  imports: [
    HttpClientModule,
    AppMaterialModule, DialogModule, AnimationModule, TooltipModule, NgTranslateModule,
  ],
  exports: [
    AppMaterialModule, NgTranslateModule,
    TooltipComponent, ToggleComponent, ExceptionComponent,
    SafeHtmlPipe, FilterOutPipe, FilterPipe,
  ],
  declarations: [
    SafeHtmlPipe, FilterOutPipe, FilterPipe, ExceptionComponent],
  entryComponents: [],
  providers: [HttpService, StorageService, JwtAuthService, ToastrService, UrlService, UtilService,
    LayoutService, ValidatorService, DialogService
  ],
})
export class CoreModule { }

