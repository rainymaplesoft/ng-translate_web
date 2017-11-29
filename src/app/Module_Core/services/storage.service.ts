import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() {

    }

    getItem(key: string) {
        const data = window.sessionStorage.getItem(key);
        return JSON.parse(data);
    }

    setItem(key: string, value: any) {
        const data = JSON.stringify(value);
        window.sessionStorage.setItem(key, data);
        return { key, value };
    }
    removeItem(key: string) {
        window.sessionStorage.removeItem(key);
    }
}
