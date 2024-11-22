import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Contact} from '../../model/contact';

@Component({
  selector: 'app-add-contact-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-contact-form.component.html',
  styles: ``
})
export class AddContactFormComponent {

  @Output()
  onSave: EventEmitter<Contact> = new EventEmitter();

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  model: Contact = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: ''
  };

  onClickSave(): void {
    this.onSave.emit(Object.assign({}, this.model));
    this.model = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: ''
    }
  }

  onClickCancel() {
    this.onCancel.emit();
  }
}
