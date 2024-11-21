import {Component} from '@angular/core';
import {Contact} from '../../model/contact';
import {ContactListElementComponent} from './contact-list-element/contact-list-element.component';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

const CONTACTS: Contact[] = [
  {
    name: "Vasja",
    lastName: 'Pupkin',
    phone: '0176303099',
    email: 'vasja.pupkin@gmail.com',
    address: 'Main str 117'
  },
  {
    name: "Maria",
    lastName: 'Schmidt',
    phone: '017399910054',
    email: 'maria.schmoidt@gmail.com',
    address: 'Hauptstr 123'
  }
]


@Component({
  selector: 'app-contact-list',
  imports: [
    ContactListElementComponent,
    NgbAlert
  ],
  templateUrl: './contact-list.component.html',
  styles: ``,
  standalone: true
})
export class ContactListComponent {

  allContacts = CONTACTS;

}
