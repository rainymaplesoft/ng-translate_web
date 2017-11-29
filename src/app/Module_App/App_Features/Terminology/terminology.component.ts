import { Component, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'c-terminology',
    template: '<router-outlet></router-outlet>',
    styleUrls: []
})

export class TerminologyComponent implements OnInit {

    constructor(private translate: TranslateService) {
        const browserLang = translate.getBrowserLang();
        const matchLang = browserLang.match(/en|fr|ar/) ? browserLang : 'en';
        translate.use(matchLang);
    }

    ngOnInit() {
    }

}
