import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TooltipPopupComponent, IToolTipPopupConfig, IToolTipPopupResult } from './tooltip-popup.component';
import { DialogConfirm } from '../../enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'c-tooltip',
  template: `
    <div class="c_tooltip" *ngIf='this.showAnyway || this.memo && this.memo.length>0 && isShow'
   [matTooltip]='getBriefMemo()' (click)='onClick()'>
      <div>
        <i class="material-icons c_icon">more</i>
      </div>
    </div>
  `,
  styles: [`
      .tooltip{
        display: -webkit-flex;
        display:flex;
        justify-content: flex-end;
      }
      .c_icon{
        cursor:pointer;
        font-size:18px;
        color: cadetblue;
      }
  `]
})
export class TooltipComponent implements OnInit {
  @Input() memo: string;
  @Input() canSave: boolean;
  @Input() showAnyway: boolean;
  @Input() showTooltip: boolean;
  @Input() readonly: boolean;
  @Output() updateData = new EventEmitter<string>();
  isShow = true;
  maxLength = 300;
  constructor(private popup: MatDialog) { }

  ngOnInit() {

  }

  getBriefMemo() {
    if (!this.memo || this.memo.length === 0 || !this.showTooltip) {
      return;
    }
    if (this.memo && this.memo.length <= this.maxLength) {
      return this.memo;
    }
    return this.memo.substr(0, this.maxLength) + '...';
  }

  onClick() {
    const config: IToolTipPopupConfig = { data: this.memo, canSave: this.canSave, readonly: this.readonly };
    const dialogRef = this.popup.open(TooltipPopupComponent, { data: config });

    dialogRef.afterClosed().subscribe((result: IToolTipPopupResult) => {
      if (this.canSave && result.dialogConfirm === DialogConfirm.Ok) {
        this.updateData.emit(result.data);
      }
    });
  }
}
