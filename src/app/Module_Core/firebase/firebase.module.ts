import { NgModule, ModuleWithProviders } from '@angular/core';

// import * as firebase from 'firebase/app'; // typings only, should be in firebase service
import 'firebase/storage'; // global firebase storage javascript

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireService } from './firebase.service';
import { FireAuthService } from './firebase.auth.service';
import { FirebaseAuthGuard } from './firebase.guard.service';

const fireConfig = {
    apiKey: 'AIzaSyAibEsyEdtFISxVE52i3GP6AY85QP8jMZw',
    authDomain: 'pcg-edplan-i18n.firebaseapp.com',
    databaseURL: 'https://pcg-edplan-i18n.firebaseio.com',
    projectId: 'pcg-edplan-i18n',
    storageBucket: 'pcg-edplan-i18n.appspot.com',
    messagingSenderId: '187895064797'
};

@NgModule({
    imports: [
        AngularFireModule.initializeApp(fireConfig),
        AngularFireDatabaseModule, AngularFireAuthModule
    ],
    exports: [],
    declarations: [],
    providers: [AngularFireService, FireAuthService, FirebaseAuthGuard],
})
export class FirebaseModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FirebaseModule,
            providers: [
                AngularFireService, FireAuthService, FirebaseAuthGuard
            ]
        };
    }
}
