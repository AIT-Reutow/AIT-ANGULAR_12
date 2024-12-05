import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../../service/contact.service';
import {RouterLink} from '@angular/router';
import {SpinnerComponent} from '../spinner/spinner.component';
import {AuthService} from '../../service/auth.service';
import {ReadContactDto} from '../../model/read-contact-dto';
import {first} from 'rxjs';

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
    console.log('1');
    this.authService.login('john.doe@example.com', 'MyPass007!')
      .pipe(first())
      .subscribe({
        next: pupkin => {

          this.contactService.getAll()
            .pipe(first())
            .subscribe({
              next: x => this.allContacts = x,
            });

        },
        error: err => console.error('Something wrong occurred: ' + err),
        complete: () => console.log('Done')
      });
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
