import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../../service/contact.service';
import {RouterLink} from '@angular/router';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'app-contact-list',
  imports: [
    NgbAlert,
    RouterLink,
    SpinnerComponent
  ],
  templateUrl: './contact-list.component.html',
  styles: ``,
  standalone: true
})
export class ContactListComponent implements OnInit {

  allContacts: Contact[] | undefined;
  isCreateModus: boolean = false;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.allContacts = this.contactService.getAll();
    }, 1000);
  }

  toggleCreateModus() {
    this.isCreateModus = !this.isCreateModus;
  }

  onSaveContact(newContact: Contact) {
    this.allContacts!.push(newContact);
    this.toggleCreateModus();
  }

  protected readonly String = String;
}
