import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../service/contact.service';
import {Contact} from '../../../model/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {EditContactFormComponent} from '../../edit-contact-form/edit-contact-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [],
  templateUrl: './contact-details.component.html',
  styles: ``
})
export class ContactDetailsComponent implements OnInit {

  contact!: Contact;
  private currentContactId!: number;

  constructor(private contactService: ContactService,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('contactId');
    if (!id) {
      throw new Error('No contact id provided');
    }
    this.currentContactId = +id;
    this.contact = this.contactService.getById(Number(this.currentContactId));

    console.log('id', id);
    console.log('contact', this.contact);
  }

  onClickEdit() {
    const modalRef = this.modalService.open(EditContactFormComponent);
    modalRef.componentInstance.contactToEdit = this.contact;

    modalRef.closed.subscribe(result => {
      this.contact = {id: this.currentContactId, ...result};
      this.contactService.edit(this.currentContactId, this.contact);
    });
  }

  onClickDelete() {
    this.contactService.delete(this.currentContactId);
    this.router.navigate(['/']);
  }
}
