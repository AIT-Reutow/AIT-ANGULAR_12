import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Contact} from '../../model/contact';
import {NgbActiveModal, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-edit-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbAlert,
    JsonPipe
  ],
  templateUrl: './edit-contact-form.component.html',
  styles: ``
})
export class EditContactFormComponent implements OnInit, OnDestroy {

  @Input()
  protected contactToEdit!: Contact

  protected editForm: FormGroup | undefined;
  nameFiledMaxLength: number = 50;

  constructor(private fb: FormBuilder,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    console.log('this.contactToEdit', this.contactToEdit);
    this.editForm = this.fb.group({
      firstName: [this.contactToEdit.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(this.nameFiledMaxLength),
        Validators.pattern('[a-zA-Z]+')
      ]],
      lastName: [this.contactToEdit.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z]+')
      ]],
      email: [this.contactToEdit.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]],
      phone: [this.contactToEdit.phone, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern('[0-9]+')
      ]],
      address: [this.contactToEdit.address, [
        Validators.minLength(5),
        Validators.maxLength(120),
      ]]
    });
  }


  onClickSave(): void {
    this.activeModal.close(this.editForm!.value);
  }

  onClickCancel(): void {
    this.activeModal.dismiss("cancel");
  }

  hasControlError(controlName: 'firstName' | 'lastName' | 'email' | 'phone' | 'address', error: 'required' | 'minlength' | 'maxlength' | 'pattern') {
    const formControl = this.getFormControl(controlName);
    return formControl.hasError(error);
  }

  isFormDirtyOrTouched(controlName: 'firstName' | 'lastName' | 'email' | 'phone' | 'address') {
    const formControl = this.getFormControl(controlName);
    return formControl.dirty || !formControl.untouched;
  }

  hasControlErrors(controlName: 'firstName' | 'lastName' | 'email' | 'phone' | 'address') {
    const formControl = this.getFormControl(controlName);
    return formControl.invalid;
  }

  getFormControl(controlName: 'firstName' | 'lastName' | 'email' | 'phone' | 'address') {
    return this.editForm!.controls[controlName]
  }

  ngOnDestroy(): void {
    console.warn("Component destroyed")
  }
}
