import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { saveAs as importedSaveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import { AngularFireService, IKeyValue, INoSqlService, ToastrService, Config } from 'app/Module_Core';

interface ITermsInfo {
    client: string;
    lang: string;
    terms: any;
}

@Injectable()
export class TerminologyService {

    private _root = Config.i18nRoot;
    private _defaultClient = Config.client;
    private _english = 'english';

    constructor(private dbService: AngularFireService, protected toastr: ToastrService) { }

    public get defaultClient() {
        return this._defaultClient;
    }
    public get defaultLanguage() {
        return this._english;
    }

    // #region get objects
    public downloadJson(filename = 'language.json') {
        this.dbService.getDbObject(this._root).subscribe(data => {
            // importedSaveAs(blob, filename)
            const json = {};
            json[this._root] = data;
            const blob = new Blob([JSON.stringify(json)], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(blob, filename);
        })
    }

    public getRootObject() {
        return this.dbService.getDbObject(this._root).map(data => {
            return data;
        });
    }

    public getAllClients() {
        return this.dbService.getDbObject(this._root).map(data => {
            const keys = Object.keys(data).map(key => key.toUpperCase());
            return keys;
        });
    }

    public getAllLanguages() {
        return this.dbService.getDbObject(this._root, this._defaultClient).map(data => {
            const keys = Object.keys(data).map(key => this.uppperFirst(key));
            return keys;
        })
    }

    public getAllCategories(): Observable<string[]> {
        return this.dbService.getDbObject(this._root, this._defaultClient, this._english).map(data => {
            const keys = Object.keys(data).map(key => this.uppperFirst(key));
            return keys;
        })
    }

    public getCategoryTerms(client: string, lang: string, cat: string): Observable<IKeyValue[]> {
        return this.dbService.getDbObject(this._root, client, lang, cat).map(data => {
            const terms: IKeyValue[] = [];
            Object.keys(data).forEach(key => {
                terms.push({ key: key, value: data[key] });
            })
            return terms;
        })
    }

    public getTermObject(client: string, lang: string, cat: string): Observable<any> {
        return this.dbService.getDbObject(this._root, client, lang, cat).first();
    }

    //#endregion

    public updateTerms(client: string, lang: string, cat: string, terms: IKeyValue[]) {
        return this.dbService.updateDbObject(terms, this._root, client, lang, cat).then(c => {
            this.toastr.success('Saved successfully');
        }).catch(c => {
            this.toastr.error('Failed to save');
        });
    }

    // #region add/remove client
    public addClient(terms: any) {
        return this.dbService.updateObject(terms, this._root).then(c => {
            this.toastr.success('Added client successfully');
        }).catch(c => {
            this.toastr.error('Failed to add client');
        });
    }

    public removeClient(client: string) {
        client = client.toLowerCase();
        return this.dbService.removeObject(this._root, client).then(c => {
            this.toastr.success('Removed client successfully');
        }).catch(c => {
            this.toastr.error('Failed to remove client');
        });
    }
    //#endregion

    // #region add/remove terminology

    public addTermObject(allClients: string[], allLanguages: string[], cat: string, term: IKeyValue) {
        const actions = [];
        for (const client of allClients) {
            for (const lang of allLanguages) {
                const getTerm = this.dbService.getDbObject(this._root, client, lang, cat).first();
                const action = getTerm.concatMap(terms => {
                    terms[term.key] = term.value;
                    return this.dbService.updateObject(terms, this._root, client, lang, cat);
                })
                actions.push(action);
            }
        }
        return Observable.forkJoin(actions);
    }

    public removeTermObject(allClients: string[], allLanguages: string[], cat: string, termKey: string) {
        const actions = [];
        for (const client of allClients) {
            for (const lang of allLanguages) {
                const request = this.dbService.removeObject(this._root, client, lang, cat, termKey).then(c => c, e => e)
                actions.push(request);
            }
        }
        return Observable.forkJoin(actions).toPromise();
    }
    //#endregion

    private uppperFirst(word: string) {
        let result = '';
        if (word.length > 1) {
            result = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
        } else {
            result = word.substr(0, 1).toUpperCase();
        }
        return result;
    }
}
