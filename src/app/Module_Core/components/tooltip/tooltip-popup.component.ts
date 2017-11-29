import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfirm } from '../../enums';

export interface IToolTipPopupConfig {
  data: string;
  canSave: boolean;
  readonly: boolean;
}

export interface IToolTipPopupResult {
  data: string;
  dialogConfirm: DialogConfirm;
}

@Component({
  selector: 'tooltip-popup',
  template: `
    <div class='popup'>
      <h2 mat-dialog-title>{{"COMPETENCY.COMMENT"|translate}}</h2>
      <div style='margin: 1em;flex:1;min-height:400px; max-height:600px; overflow-y:auto;'>
        <div *ngIf="!this.canSave">
          {{memo}}
        </div>
          <textarea *ngIf="this.canSave" [(ngModel)]='memo' cols="30" rows="20" [readonly]='this.readonly'></textarea>
      </div>
      <div mat-dialog-actions style='display:flex; justify-content: center;'>
        <button mat-button (click)="dialogClose('ok')">{{"DIALOG.OK"|translate}}</button>
          <!--
          <div *ngIf="this.canSave">
            <button mat-button (click)="dialogClose('yes')">{{"DIALOG.SAVE"|translate}}</button>
            <button mat-button (click)="dialogClose('no')">{{"DIALOG.CANCEL"|translate}}</button>
          </div>
          -->
      </div>
    </div>
    `,
  styles: [
    `button{margin:0 .3em}
    .popup{
      min-width:400px;max-height:70vh;display:-webkit-flex; display:flex;flex-direction:column;max-width:1000px;
    }
    textarea{
      height: 100%;
      width: 100%;
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box;    /* Firefox, other Gecko */
      box-sizing: border-box;         /* Opera/IE 8+ */
    }
      `
  ]
})
export class TooltipPopupComponent implements OnInit {
  memo: string;
  canSave: boolean;
  readonly: boolean;
  constructor(public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public config: IToolTipPopupConfig) { }

  ngOnInit() {
    this.memo = this.config.data;
    this.canSave = this.config.canSave;
    this.readonly = !!this.config.readonly;
    if (this.readonly) {
      this.canSave = false;
    }
  }

  dialogClose(option: string) {
    this.dialogRef.close({ data: this.memo, dialogConfirm: DialogConfirm.Ok });
    /*
    if (this.canSave) {
      const result: IToolTipPopupResult = option === 'yes' ?
        { data: this.memo, dialogConfirm: DialogConfirm.Yes } :
        { data: this.memo, dialogConfirm: DialogConfirm.No };
      this.dialogRef.close(result);
    } else {
      this.dialogRef.close({ data: this.memo, dialogConfirm: DialogConfirm.Ok });
    }
    */
  }
}
