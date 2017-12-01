import { Component, OnInit } from '@angular/core';
import { RouteName } from '../../App_Common/routeName';

@Component({
    selector: 'app-landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss']
})

export class LandingComponent implements OnInit {

    title1 = 'App Translation';

    features = [
        {
            icon_name: 'supervisor_account',
            title: 'Publication Setting',
            route: RouteName.Landing,
            description: 'Add / remove / edit publication for the application'
        },
        {
            icon_name: 'open_in_new',
            title: 'Terminology Management',
            route: RouteName.Terminology + '/' + RouteName.ManageTerm,
            description: 'Add / remove / terminologies for all publications'
        }
    ];
    techs = [
        {
            src: '../assets/img/img-angular.png',
            url: ''
        },
        {
            src: '../assets/img/img-angularfire.png',
            url: ''
        },
        {
            src: '../assets/img/img-html-css.png',
            url: ''
        },
        {
            src: '../assets/img/img-sass.png',
            url: ''
        },
        {
            src: '../assets/img/img-responsive.png',
            url: ''
        },
        {
            src: '../assets/img/img-typescript.png',
            url: ''
        },
        {
            src: '../assets/img/img-electron.png',
            url: ''
        },
        {
            src: '../assets/img/img-nativescript.png',
            url: ''
        }
    ];

    constructor() { }

    ngOnInit() { }
}
