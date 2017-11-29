import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

export interface IUtilService {
  isNarrowView(): boolean;
  isMobile(): boolean;
  isNumber(value: any, decimalNumber: number): boolean;
  isNullOrEmptyObject(obj): boolean;
  sanitizeUrl(url): string;
}

@Injectable()
export class UtilService {

  private widthNarrow = 960;

  constructor(private sanitizer: DomSanitizer, private translateService: TranslateService) { }

  translate(...messages: string[]) {
    // returns a observable
    return this.translateService.get(messages);
  }

  public isNarrowView = (): boolean => window.innerWidth < this.widthNarrow;

  public isMobile(): boolean {
    const device = this.deviceType();
    const deviceType = this.getDeviceType(device.Mobile);
    // console.log(!!deviceType ? 'This is a Mobile: ' + deviceType : 'This is not a Mobile');
    if (!!deviceType) {
      // console.log('This is a Mobile: ' + deviceType);
    }
    return !!deviceType;
  }

  public sanitizeUrl(url): string {
    return <string>this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public isNumber(value, decimalNumber = 0): boolean {
    value = value.trim();
    if (value.substr(0, 1) === '0' && value.length > 1 && value.substr(0, 2) !== '0.') {
      return false;
    }
    if (value.substr(0, 1) === '.') {
      return false;
    }

    if (isNaN(+value)) {
      return false;
    }
    // decimal number allowed
    if (decimalNumber !== null && decimalNumber !== undefined) {
      const parts = value.split('.');
      if (parts[1] && parts[1].length > decimalNumber) {
        return false;
      }
    }
    return true;
    /*
    var numStr = /^\d*(\.\d{1,1})?$/;
    return numStr.test(value);
    */
  }

  public isNullOrEmptyObject(obj): boolean {
    if (!obj) {
      return false;
    }
    return Object.keys(obj).length === 0;
  }

  public keysToLowerCase(obj) {
    const me = this;
    if (typeof (obj) === 'string' || typeof (obj) === 'number' || typeof (obj) === 'boolean') {
      return obj;
    }
    const keys = Object.keys(obj);
    let n = keys.length;
    let lowKey;
    while (n--) {
      const key = keys[n];
      lowKey = key.toLowerCase();
      obj[lowKey] = me.keysToLowerCase(obj[key]);
      if (key !== lowKey) {
        delete obj[key];
      }
    }
    return (obj);
  }

  public keysToUpperCase(obj) {
    const me = this;
    if (typeof (obj) === 'string' || typeof (obj) === 'number' || typeof (obj) === 'boolean') {
      return obj;
    }
    const keys = Object.keys(obj);
    let n = keys.length;
    let lowKey;
    while (n--) {
      const key = keys[n];
      lowKey = key.toUpperCase();
      obj[lowKey] = me.keysToUpperCase(obj[key]);
      if (key !== lowKey) {
        delete obj[key];
      }
    }
    return (obj);
  }
  /* private helper functions */

  private deviceType() {
    return {
      Windows: 'Windows',
      MacOs: 'MacOs',
      Android: 'Android',
      iOS: 'iOS',
      Mobile: 'Mobile'
    }
  }

  private getDeviceType(typeName) {
    // var deviceType = getDeviceType();

    const testType = {
      Android: function () {
        if (!navigator.userAgent.match(/Android/i)) {
          return '';
        }
        return 'Android';
      },
      BlackBerry: function () {
        if (!navigator.userAgent.match(/BlackBerry/i)) {
          return '';
        }
        return 'BlackBerry';
      },
      iOS: function () {
        if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          return '';
        }
        return 'iPhone/iPad';
      },
      Opera: function () {
        if (!navigator.userAgent.match(/Opera Mini/i)) {
          return '';
        }
        return 'Opera Mini';
      },
      Windows: function () {
        if (!navigator.userAgent.match(/IEMobile/i)) {
          return '';
        }
        return 'IE Mobile';
      },
      MacOs: function () {
        if (navigator.userAgent.indexOf('Mac') === -1) {
          return '';
        }
        return 'Mac OS';
      },
      Mobile: function () {
        const type = (testType.Android() || testType.BlackBerry() || testType.iOS()
          || testType.Opera() || testType.Windows()) || testType.MacOs();
        if (!type) {
          return '';
        }
        return type;
      }
    };

    return testType[typeName]();
  }

}
