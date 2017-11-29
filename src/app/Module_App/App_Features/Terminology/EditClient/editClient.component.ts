import { Component, OnInit } from '@angular/core';
import { TerminologyService } from '../terminology.service';
import { IKeyValue, ToastrService, DialogService } from 'app/Module_Core';
import * as _ from 'lodash';

@Component({
    selector: 'edit-client',
    templateUrl: 'editClient.component.html',
    styleUrls: ['editClient.component.scss']
})

export class EditClientComponent implements OnInit {
    isMobile = false;
    showSave = false;
    title = 'Client';
    disableSave = true;
    isLoading = false;
    clientKey: string;
    clientKeyRemove: string;
    clients: IKeyValue[] = [];
    newClient = '';
    root = {};

    constructor(private service: TerminologyService, protected toastr: ToastrService, private dialog: DialogService) { }

    ngOnInit() {
        this.getRoot();
        this.getAllClients();
    }

    public get disableAdd() {
        return !this.clientKey || !this.newClient;
    }

    public get disableRemove() {
        return !this.clientKeyRemove || Object.keys(this.clients).length === 1;
    }

    public addClient() {
        const clientKey = this.clientKey.toLowerCase();
        this.newClient = this.newClient.toLowerCase();
        const terms = _.cloneDeep(this.root[clientKey]);
        const existing = this.root[this.newClient];
        if (existing) {
            this.toastr.warning('Cannot add duplicated client');
            return;
        }
        this.root[this.newClient] = terms;
        this.service.addClient(this.root).then(c => {
            this.getAllClients();
        })
    }

    public removeClient() {
        if (Object.keys(this.clients).length <= 1) {
            return;
        }
        this.dialog.YesNo('Are you sure to remove client "' + this.clientKeyRemove + '"?', () => {
            this.service.removeClient(this.clientKeyRemove).then(c => {
                this.clientKeyRemove = '';
                this.getAllClients();
            })
        })
    }

    private getRoot() {
        this.service.getRootObject().subscribe(d => {
            this.root = d;
        })
    }

    private getAllClients() {
        this.service.getAllClients().subscribe(c => {
            this.clients = [];
            for (const client of c) {
                this.clients.push({ key: client, value: client });
            }
        });
    }
}
