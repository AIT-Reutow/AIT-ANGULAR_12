import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbActiveModal, NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbAlert,
  ],
  templateUrl: './add-contact-form.component.html',
  styles: ``
})
export class AddContactFormComponent implements OnInit {

  protected createForm: FormGroup | undefined;
  nameFiledMaxLength: number = 50;

  constructor(private fb: FormBuilder,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: ['Andre', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(this.nameFiledMaxLength),
        Validators.pattern('[a-zA-Z]+')
      ]],
      lastName: ['Reutow', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z]+')
      ]],
      email: ['ar@ait-tr.de', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]],
      phone: ['030303030', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern('[0-9]+')
      ]],
      address: ['My street 777 105555', [
        Validators.minLength(5),
        Validators.maxLength(120),
      ]]
    });
  }


  onClickSave(): void {
    this.activeModal.close(this.createForm!.value);
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
    return this.createForm!.controls[controlName]
  }

  ngOnDestroy(): void {
    console.warn("Component destroyed")
  }
}
