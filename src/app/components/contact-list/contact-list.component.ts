import {Component, OnInit} from '@angular/core';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContactService} from '../../service/contact.service';
import {RouterLink} from '@angular/router';
import {SpinnerComponent} from '../spinner/spinner.component';
import {AuthService} from '../../service/auth.service';
import {ReadContactDto} from '../../model/read-contact-dto';
import {first} from 'rxjs';
import {AddContactFormComponent} from '../add-contact-form/add-contact-form.component';
import {CreateContactDto} from '../../model/create-contact-dto';

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

  protected readonly String = String;

  constructor(private contactService: ContactService,
              private authService: AuthService,
              private modal: NgbModal) {
  }

  ngOnInit(): void {
    console.log('1');


    this.authService.login('john.doe@example.com', 'MyPass007!')
      .pipe(first())
      .subscribe({
        next: pupkin => {
          this.getAllContacts();
        },
        error: err => console.error('Something wrong occurred: ' + err),
        complete: () => console.log('Done')
      });
  }

  getAllContacts() {
    this.contactService.getAll()
      .pipe(first())
      .subscribe({
        next: x => this.allContacts = x,
      });
  }

  onclickCreateContact() {
    const addContactModal = this.modal.open(AddContactFormComponent);
    addContactModal.closed
      .pipe(first())
      // .subscribe((result: CreateContactDto) => this.contactService.create(result)
      //   .pipe(first())
      //   .subscribe(newContact => this.getAllContacts())
      .subscribe((result: CreateContactDto) => this.contactService.create(result)
        .pipe(first())
        .subscribe(newContact => this.allContacts!.push(newContact))
      );
  }
}
