import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  private fb: FormBuilder = new FormBuilder();

  constructor(
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
   ){}


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ]],
    //email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern )], [ new EmailValidatorService()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern )], [ this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });



  isValidField(field: string){
    return this.validatorsService.isValidfield(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
