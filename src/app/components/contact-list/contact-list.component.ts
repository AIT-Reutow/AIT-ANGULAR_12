import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../../service/contact.service';
import {RouterLink} from '@angular/router';
import {SpinnerComponent} from '../spinner/spinner.component';
import {ReadContactDto} from '../../model/read-contact-dto';
import {AuthService} from '../../service/auth.service';

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

  allContacts: ReadContactDto[] | undefined;
  isCreateModus: boolean = false;

  constructor(private contactService: ContactService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.login('john.doe@example.com', 'MyPass007!')
      .subscribe(value => {
        this.contactService.getAll()
          .subscribe(allContacts => this.allContacts = allContacts);
      })
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
