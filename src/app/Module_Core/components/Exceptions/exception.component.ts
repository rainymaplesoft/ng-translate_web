import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../../animation/animation.common';
import { ErrorCode } from '../../enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'not-found',
  template: `
    <div style='display:block;height: 100vh;text-align: center;'>
        <div class="not-found">
            <div class="middle-box" [@slideInDownAnimation]>
                <h1 style='font-size: 170px; margin: 1em 0 .2em 0;'>{{errorCode}}</h1>
                <h2 style='font-size: 2em; margin: 0.5em 0;'>{{message}}</h2>
                <h3  style='font-size: 1.2em;'>Please contact administrator for support.</h3>
                <button mat-raised-button (click)="navigateHome()">
                    <mat-icon>home</mat-icon>
                    <span>Home</span>
                </button>
            </div>
        </div>
    </div>
  `,
  styles: [
    `
        .not-found{
            display: flex;
            justify-content: center;
            height: 100%;
            background-color: #f3f3f4;
            color: #676a6c;
            font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 13px;
            overflow-x: hidden;
        }
      `
  ],
  animations: [slideInDownAnimation]
})

export class ExceptionComponent {
  errorCode = '404';
  message = 'Page Not Found';
  navigateRoute = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.errorCode = params['errorCode'];
      this.navigateRoute = params['navigateRoute'];
      switch (this.errorCode) {
        case ErrorCode.NotFound:            // 404
          this.message = 'Page Not Found';
          break;
        case ErrorCode.Unauthorized:        // 401,403
          this.message = 'Unauthorized';
          break;
        default:                            // 500
          this.message = 'Server Error';
          this.errorCode = '500';
          break;
      }
    });
  }
  navigateHome() {
    if (this.navigateRoute) {
      this.router.navigate([this.navigateRoute]);
    } else {
      this.router.navigate(['']);
    }
  }
}
