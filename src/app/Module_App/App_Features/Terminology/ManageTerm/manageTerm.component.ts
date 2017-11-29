import { Component, OnInit } from '@angular/core';
import { TerminologyService } from '../terminology.service';
import { IKeyValue, ToastrService, DialogService, slideUpDownAnimation, fadeInAnimation } from 'app/Module_Core';
import * as _ from 'lodash';
import { UtilService } from '../../../../Module_Core/services/util.service';

@Component({
    selector: 'manage-term',
    templateUrl: 'manageTerm.component.html',
    styleUrls: ['manageTerm.component.scss'],
    animations: [slideUpDownAnimation]
})

export class ManageTermComponent implements OnInit {
    isMobile = false;
    showSave = false;
    title = 'Terminology Managegment';
    disableSave = true;
    isLoading = false;
    allowRemove = false;
    newTermKey: string;
    newTermValue: string;
    newTerm: IKeyValue;
    termKeyRemove: string;
    termsForRemove: IKeyValue[] = [];
    termValueForRemove: string;
    categories: IKeyValue[] = [];
    catKeyForRemove: string;
    catKeyForAdd: string;
    root = {};
    allClients: string[] = [];
    allLanguages: string[] = [];

    constructor(private service: TerminologyService, protected toastr: ToastrService,
        private dialog: DialogService, private util: UtilService) {
        this.isMobile = this.util.isMobile();
    }

    ngOnInit() {
        this.getRoot();
        this.getCategories();
        this.getAllClients();
        this.getAllLanguages();
    }

    public get disableAdd() {
        return !this.newTermKey || !this.newTermValue;
    }

    public get disableRemove() {
        return !this.termKeyRemove || !this.allowRemove;
    }

    public onCatForAddChanged(catKey) {
        this.newTermKey = '';
        this.newTermValue = '';
    }


    public onCatChanged(cat) {
        this.termKeyRemove = '';
        this.termValueForRemove = '';
        this.allowRemove = false;
        this.getTerms();
    }

    public onTermChanged(termKeyRemove) {
        this.termValueForRemove = this.getTermValue();
    }

    public addTerm() {
        if (this.allClients.length === 0 || this.allLanguages.length === 0 || !this.catKeyForAdd
            || !this.newTermKey || !this.newTermValue) {
            return;
        }
        this.newTerm = { key: this.newTermKey, value: this.newTermValue };
        const key = this.catKeyForAdd.toUpperCase() + '.' + this.newTermKey.toUpperCase();

        this.checkKeyExisting(this.newTermKey).subscribe(isKeyExisting => {
            if (isKeyExisting) {
                this.toastr.warning(`The key "${key}" of this new temninology is already existing!`);
            } else {
                this.dialog.YesNo('Are you sure to add Terminology "' + key + '"?', this.addTermAction);
            }
        })
    }
    public download() {
        this.service.downloadJson();
    }

    private checkKeyExisting(newTermKey) {
        return this.service.getTermObject(this.service.defaultClient, this.service.defaultLanguage, this.catKeyForAdd)
            .map(data => {
                const termsForAdd = data;
                const isKeyExisting = termsForAdd[newTermKey];
                return isKeyExisting;
            })
    }

    private addTermAction = () => {
        this.service.addTermObject(this.allClients, this.allLanguages, this.catKeyForAdd, this.newTerm).subscribe(data => {
            const aa = data;
            this.newTermKey = '';
            this.newTermValue = '';
            this.newTerm = null;
            this.termKeyRemove = '';
            this.termValueForRemove = '';
            this.toastr.success('Added Terminology successfully');
        }, (error) => {
            this.toastr.error('Failed to add temninology');
        });
    }

    public removeterm() {
        if (this.allClients.length === 0 || this.allLanguages.length === 0) {
            return;
        }
        const key = this.catKeyForRemove.toUpperCase() + '.' + this.termKeyRemove.toUpperCase();
        this.dialog.YesNo('Are you sure to remove Terminology "' + key + '"?', this.removeTermAction)
    }

    private removeTermAction = () => {
        this.service.removeTermObject(this.allClients, this.allLanguages, this.catKeyForRemove, this.termKeyRemove)
            .then(c => {
                this.onCatChanged(this.catKeyForRemove);
                this.toastr.success('Removed terminology successfully');
            }, (error) => {
                this.toastr.error('Failed to removed terminology');
            })
    }

    private getRoot() {
        this.service.getRootObject().subscribe(d => {
            this.root = d;
        })
    }

    private getAllClients() {
        this.service.getAllClients().subscribe(c => this.allClients = c);
    }

    private getAllLanguages() {
        this.service.getAllLanguages().subscribe(c => this.allLanguages = c);
    }

    private getCategories() {
        this.service.getAllCategories().subscribe(data => {
            this.categories = [];
            for (const item of data) {
                this.categories.push({ key: item, value: item });
            }
        });
    }

    private getTerms() {
        if (!this.catKeyForRemove) {
            this.termsForRemove = [];
            return;
        }
        this.service.getCategoryTerms(this.service.defaultClient, this.service.defaultLanguage, this.catKeyForRemove)
            .subscribe(data => {
                this.termsForRemove = data;
            })
    }

    private getTermValue() {
        if (!this.termsForRemove || this.termsForRemove.length === 0 || !this.termKeyRemove) {
            return '';
        }
        const term = _.find(this.termsForRemove, (c: IKeyValue) => {
            return c.key === this.termKeyRemove
        });
        return !term ? '' : term.value;
    }
}
