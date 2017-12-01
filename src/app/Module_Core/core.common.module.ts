import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  // app core modules
  TooltipModule, AnimationModule, DialogModule,
  // app core components
  ExceptionComponent, TooltipComponent, ToggleComponent,
  // app core pipes
  SafeHtmlPipe, FilterOutPipe, FilterPipe,
} from './export';

import { AppMaterialModule } from './material.modual';
import { NgTranslateModule } from './translate.module';



@NgModule({
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    AppMaterialModule, NgTranslateModule,
    DialogModule, AnimationModule, TooltipModule,
  ],
  exports: [
    // system modules
    CommonModule, FormsModule, ReactiveFormsModule,
    // app core modules
    AppMaterialModule, NgTranslateModule,
    // app core components
    TooltipComponent, ToggleComponent, ExceptionComponent,
    // app core pipes
    SafeHtmlPipe, FilterOutPipe, FilterPipe,
  ],
  declarations: [
    SafeHtmlPipe, FilterOutPipe, FilterPipe, ExceptionComponent],
  entryComponents: [],
  // services should be moved to CoreServiceModule
  providers: [],
})
export class CoreCommonModule { }

