import {Component} from '@angular/core';
import {ContactListComponent} from './components/contact-list/contact-list.component';
import {
  ContactListElementComponent
} from './components/contact-list/contact-list-element/contact-list-element.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactListComponent, ContactListElementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'untitled';
}
