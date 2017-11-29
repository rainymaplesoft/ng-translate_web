import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatButtonModule } from '@angular/material';
import { TooltipComponent } from './tooltip.component';
import { TooltipPopupComponent } from './tooltip-popup.component';
import { NgTranslateModule } from '../../translate.module';


@NgModule({
  imports: [CommonModule, NgTranslateModule, MatTooltipModule, MatButtonModule, FormsModule],
  exports: [TooltipComponent, TooltipPopupComponent],
  declarations: [TooltipComponent, TooltipPopupComponent],
  entryComponents: [TooltipPopupComponent],
  providers: [],
})
export class TooltipModule { }
