import { CanDeactivate, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
// import { AppAuthService } from './auth.service';
import { RouteName } from './routeName';
import { UtilService, ErrorCode } from '../../Module_Core/';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
    label_Warning = 'DIALOG.LEAVE_WARNING';
    constructor(private util: UtilService) {
        this.util.translate(this.label_Warning)
            .subscribe(texts => {
                this.label_Warning = texts[this.label_Warning];
            });
    }
    canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        // if there are no pending changes, just allow deactivation; else confirm first
        return component.canDeactivate() ?
            true :
            // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
            // when navigating away from your angular app, the browser will show a generic warning message
            // see http://stackoverflow.com/a/42207299/7307355
            confirm(this.label_Warning);
    }
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
    private errorCode: string;
    constructor(
        // private authService: AppAuthService,
        private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return Observable.of(true);
        // return this.authService.getUserInfo().map(
        //     (user: IAuthenticatedUser) => {
        //         if (!!user) {
        //             return true;
        //         }
        //         this.router.navigate([RouteName.Exception,
        //         {
        //             errorCode: ErrorCode.ServerError,
        //             navigateRoute: RouteName.Home
        //         }]);
        //         return false;
        //     }
        // );
    }
}


@Injectable()
export class StaffAuthenticateGuard implements CanActivate {
    private errorCode: string;
    constructor(
        // private authService: AppAuthService,
        private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return Observable.of(true);
        // return this.authService.getUserInfo().map(
        //     (user: IAuthenticatedUser) => {
        //         if (!!user && (user.isSysAdmin || user.isSchoolAdmin || user.isPricipal || user.isTeacher)) {
        //             return true;
        //         }
        //         this.router.navigate([RouteName.Exception,
        //         {
        //             errorCode: ErrorCode.Unauthorized,
        //             navigateRoute: RouteName.Home
        //         }]);
        //         return false;
        //     }
        // );
    }
}

@Injectable()
export class SysAdminAuthenticateGuard implements CanActivate {
    private errorCode: string;
    constructor(
        // private authService: AppAuthService,
        private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return Observable.of(true);
        // return this.authService.getUserInfo().map(
        //     (user: IAuthenticatedUser) => {
        //         if (!!user && (user.isSysAdmin)) {
        //             return true;
        //         }
        //         this.router.navigate([RouteName.Exception,
        //         {
        //             errorCode: ErrorCode.Unauthorized,
        //             navigateRoute: RouteName.Home
        //         }]);
        //         return false;
        //     }
        // );
    }
}
