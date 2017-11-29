import { CanDeactivate, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ErrorCode } from '../enums';
import { FireAuthService } from './firebase.auth.service';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    private errorCode: string;
    constructor(
        private authService: FireAuthService,
        private router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot, ): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.user$.map(user => {
            if (user && user.uid) {
                return true;
            } else {
                this.router.navigate(['/',
                    {
                        errorCode: ErrorCode.ServerError,
                        navigateRoute: '/'
                    }]);
                return false;
            }
        });
    }
}
