import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlService {
    path: string;
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.url.subscribe(url => this.path = url[0].path);
    }
    get(type: string): Observable<any> {
        return this.activatedRoute[type];
    }
    set(type: string, value: any): Promise<boolean> {
        if (type === 'params') {
            return this.router.navigate([this.path, value]);
        }
        if (type === 'queryParams') {
            return this.router.navigate([this.path], { queryParams: value });
        }
        if (type === 'fragment') {
            return this.router.navigate([this.path], { fragment: value });
        }
    }
}
