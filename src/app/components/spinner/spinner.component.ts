import {Component} from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="spinner-grow text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
  styles: ``
})
export class SpinnerComponent {

}
