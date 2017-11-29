import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IKeyValue } from 'app/Module_Core';
import { TerminologyService } from '../terminology.service';
import { ITermInfo } from '../';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'category-filter',
    templateUrl: 'category.filter.html',
    styleUrls: ['./category.filter.scss']
})

export class CategoryFilterComponent implements OnInit {
    clientKey: string;
    clients: IKeyValue[] = [];
    langKey: string;
    languages: IKeyValue[] = [];
    catKey: string;
    categories: IKeyValue[] = [];
    terms: IKeyValue[] = [];
    @Output() termsChange = new EventEmitter<ITermInfo>();

    constructor(private service: TerminologyService) { }

    ngOnInit() {
        this.getFilterData();
    }
    public onClientChanged(clientKey) {
        this.getTerms();
    }

    public onLangChanged(langKey) {
        this.getTerms();
    }
    public onCatChanged(catKey) {
        this.getTerms();
    }

    private getFilterData() {
        this.service.getAllClients().subscribe(c => {
            this.clients = [];
            for (const client of c) {
                this.clients.push({ key: client, value: client });
            }
        });
        this.service.getAllLanguages().subscribe(data => {
            this.languages = [];
            for (const item of data) {
                this.languages.push({ key: item, value: item });
            }
        });
        this.service.getAllCategories().subscribe(data => {
            this.categories = [];
            for (const item of data) {
                this.categories.push({ key: item, value: item });
            }
        });
    }
    private getTerms() {
        if (!this.clientKey || !this.langKey || !this.catKey) {
            return;
        }
        this.service.getCategoryTerms(this.clientKey, this.langKey, this.catKey).subscribe(data => {
            this.terms = data;
            const termInform: ITermInfo = {
                client: this.clientKey,
                language: this.langKey,
                category: this.catKey,
                terms: this.terms
            };
            this.termsChange.emit(termInform);
        })
    }
}
