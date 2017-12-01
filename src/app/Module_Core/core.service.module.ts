import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  // app core services
  HttpService, StorageService, JwtAuthService, ToastrService, UrlService, UtilService, LayoutService, ValidatorService, DialogService,
} from './export';

import { AppMaterialModule } from './material.modual';
import { NgTranslateModule } from './translate.module';



@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  entryComponents: [],
  providers: [],
})
export class CoreServiceModule {
  /**
   *Prevent reimport of the CoreModule
   */
  constructor( @Optional() @SkipSelf() parentModule: CoreServiceModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreServiceModule,
      providers: [
        HttpService, StorageService, JwtAuthService, ToastrService, UrlService, UtilService,
        LayoutService, ValidatorService, DialogService
      ]
    };
  }
}

