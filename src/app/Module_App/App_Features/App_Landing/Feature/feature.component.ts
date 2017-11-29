import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-feature',
    styleUrls: ['feature.component.scss'],
    template: `
    <div class="feature">
        <div class="feature_content">
          <a (click)='navigate($event)'>
            <mat-icon>{{icon_name}}</mat-icon>
          </a>
          <div class="title">{{title}}</div>
          <div class="description">{{description}}</div>
        </div>
      </div>`
})

export class LandingFeatureComponent implements OnInit {
    @Input() icon_name: string;
    @Input() title: string;
    @Input() route: string;
    @Input() description: string;

    constructor(private router: Router) { }

    ngOnInit() { }

    public navigate(event: any) {
        this.router.navigate([this.route]);
    }
}