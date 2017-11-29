import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { TerminologyService } from '../terminology.service';
import { ITermInfo } from '../terminology.model';
import { IKeyValue, UtilService } from 'app/Module_Core';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'c-terminology',
    templateUrl: 'termsEdit.component.html',
    styleUrls: ['termsEdit.component.scss']
})

export class TermsEditComponent implements OnInit {
    showSave = true;
    title = 'Terminologies';
    disableSave = true;
    isLoading = false;
    isMobile = false;

    terms: IKeyValue[];
    termsOrigin: IKeyValue[];
    termInfo: ITermInfo;
    constructor(
        private service: TerminologyService, private util: UtilService
    ) { }

    ngOnInit() {
        this.isMobile = this.util.isMobile();
    }

    public onFiltersChanged(termInfo: ITermInfo) {
        this.termInfo = termInfo;
        this.terms = termInfo.terms;
        this.termsOrigin = _.cloneDeep(this.terms);
    }


    public onSaveClick(param: any) {
        if (!this.termInfo.client || !this.termInfo.language || !this.termInfo.category) {
            return;
        }
        this.service.updateTerms(this.termInfo.client, this.termInfo.language, this.termInfo.category, this.termInfo.terms)
            .then(c => {
                this.termsOrigin = _.cloneDeep(this.terms);
                this.checkChanges();
            });

    }

    public onTermChange(term: string) {
        this.checkChanges();
        console.log(term);
    }

    private checkChanges() {
        const isNotChanged = _.isEqual(this.terms, this.termsOrigin);
        this.disableSave = isNotChanged;
    }
    public onRouteBackClick(event: any) {

    }
}
