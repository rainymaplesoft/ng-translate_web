import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { slideUpDownAnimation } from '../../../../Module_Core';

@Component({
  selector: 'widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.scss'],
  animations: [slideUpDownAnimation]
})
export class WidgetEditComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() showSave: boolean;
  @Input() showAdd: boolean;
  @Input() showRest: boolean;
  @Input() disableSave: boolean;
  @Input() disableAdd: boolean;
  @Input() showDelete: boolean;
  @Input() disableDelete: boolean;
  @Input() isLoading: boolean;
  @Input() isMobile: boolean;
  @Output() clickBack = new EventEmitter<any>();
  @Output() clickSave = new EventEmitter<any>();
  @Output() clickDelete = new EventEmitter<any>();
  @Output() clickAdd = new EventEmitter<any>();

  tooltip_save: string;
  tooltip_delete: string;
  tooltip_back: string;

  /* progress bar */
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isShowProgress = false;

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isShowProgress = this.isLoading;
  }
  onRouteBackClick() {
    this.clickBack.emit();
  }

  onSaveClick() {
    this.clickSave.emit();
  }

  onAddClick() {
    this.clickAdd.emit();
  }

  onDeleteClick() {
    this.clickDelete.emit();
  }
}
