import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class='master'>
      <div class="header-master"></div>
      <div class="root-outlet">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';


}
