import {Component, Input} from '@angular/core';
import {Contact} from '../../../model/contact';

@Component({
  selector: 'app-contact-list-element',
  imports: [],
  template: `
    <li class="list-group-item list-group-item-action">ID: {{ (elementId + 1) }}</li>
    <li class="list-group-item list-group-item-action">Name: {{ contactToDisplay.name }}</li>
    <li class="list-group-item list-group-item-action">Last name: {{ contactToDisplay.lastName }}</li>
    <li class="list-group-item list-group-item-action">Address: {{ contactToDisplay.address }}</li>
    <li class="list-group-item list-group-item-action">Phone: {{ contactToDisplay.phone }}</li>
    <li class="list-group-item list-group-item-action">Email: {{ contactToDisplay.email }}</li>
  `,
  styles: ``,
  standalone: true
})
export class ContactListElementComponent {

  @Input()
  contactToDisplay!: Contact;
  @Input()
  elementId!: number;

}
