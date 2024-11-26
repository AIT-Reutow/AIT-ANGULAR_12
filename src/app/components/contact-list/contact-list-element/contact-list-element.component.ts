import {Component, Input} from '@angular/core';
import {Contact} from '../../../model/contact';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditContactFormComponent} from '../../edit-contact-form/edit-contact-form.component';

@Component({
  selector: 'app-contact-list-element',
  imports: [],
  template: `
    <li class="list-group-item list-group-item-action">ID: {{ (elementId + 1) }}</li>
    <li class="list-group-item list-group-item-action">Name: {{ contactToDisplay.firstName }}</li>
    <li class="list-group-item list-group-item-action">Last name: {{ contactToDisplay.lastName }}</li>
    <li class="list-group-item list-group-item-action">Address: {{ contactToDisplay.address }}</li>
    <li class="list-group-item list-group-item-action">Phone: {{ contactToDisplay.phone }}</li>
    <li class="list-group-item list-group-item-action">Email: {{ contactToDisplay.email }}</li>
    <li class="list-group-item list-group-item-action">
      <div class="d-flex justify-content-between">
        <button class="btn btn-warning w-100" (click)="onClickEdit()">Edit</button>
        <button class="btn btn-danger w-100 ms-3">Delete</button>
      </div>
    </li>
  `,
  styles: ``,
  standalone: true
})
export class ContactListElementComponent {

  @Input()
  contactToDisplay!: Contact;
  @Input()
  elementId!: number;

  constructor(private modalService: NgbModal) {
  }


  onClickEdit() {
    const modalRef = this.modalService.open(EditContactFormComponent);
    modalRef.componentInstance.contactToEdit = this.contactToDisplay;

    modalRef.closed.subscribe(result => {
      this.contactToDisplay = result;
    });

    // modalRef.dismissed.subscribe(result => {
    //   console.log(result);
    // });
  }
}
