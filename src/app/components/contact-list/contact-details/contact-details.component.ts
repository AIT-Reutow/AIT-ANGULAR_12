import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../service/contact.service';
import {Contact} from '../../../model/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {EditContactFormComponent} from '../../edit-contact-form/edit-contact-form.component';
import {NgbAlert, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {SpinnerComponent} from '../../spinner/spinner.component';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    NgbAlert,
    SpinnerComponent
  ],
  templateUrl: './contact-details.component.html',
  styles: ``
})
export class ContactDetailsComponent implements OnInit {

  contact!: Contact;
  private currentContactId!: number;

  errorMsg: string | undefined;
  loading: boolean = true;

  constructor(private contactService: ContactService,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('contactId');
    if (!id) {
      throw new Error('No contact id provided');
    }
    this.currentContactId = +id;

    this.errorMsg = undefined;
    this.loading = true;

    this.contactService.getById(Number(this.currentContactId))
      .pipe(first())
      .subscribe({
        next: value => {
          this.loading = false;
          this.contact = value;
        },
        error: err => this.handleErrorResponse(err),
      });

  }

  private handleErrorResponse(err: HttpErrorResponse) {
    this.errorMsg = err.error.message;
    this.loading = false;
  }

  onClickEdit() {
    const modalRef = this.modalService.open(EditContactFormComponent);
    modalRef.componentInstance.contactToEdit = this.contact;

    modalRef.closed
      .pipe(first())
      .subscribe(result => {
        this.contact = {id: this.currentContactId, ...result};
        this.contactService.edit(this.currentContactId, this.contact)
          .pipe(first())
          .subscribe(value => this.contact = value);
      });
  }

  onClickDelete() {
    this.loading = true;
    this.contactService.delete(this.currentContactId)
      .pipe(first())
      .subscribe({
        next: () => this.router.navigate(['/']).then(() => this.loading = false),
        error: err => this.handleErrorResponse(err)
      });

  }
}
