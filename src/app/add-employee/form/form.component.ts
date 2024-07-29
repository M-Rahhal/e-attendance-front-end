import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AddEmployeeRequest } from '../add-employee.model';
import { AddEmployeeService } from '../add-employee.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  firstNameFormControl = new FormControl('', [Validators.required , Validators.minLength(5)]);
  lastNameFormControl = new FormControl('', [Validators.required , Validators.minLength(5)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  genderFromControl = new FormControl('' , [Validators.required]);
  roleFormControl = new FormControl('' , [Validators.required]);
  dateOfBirthFromControl = new FormControl('' , [Validators.required]);


  matcher = new MyErrorStateMatcher();
  private addEmployeeService : AddEmployeeService = inject(AddEmployeeService);
  onSubmit(){
      let request :AddEmployeeRequest ={
        first_name: this.firstNameFormControl.value == null ? "" :this.firstNameFormControl.value,
        last_name: this.lastNameFormControl.value == null ? "" :this.lastNameFormControl.value,
        email: this.emailFormControl.value == null ? "" :this.emailFormControl.value,
        phone_number: this.phoneNumberFormControl.value == null ? "" :this.phoneNumberFormControl.value,
        gender: this.genderFromControl.value == null ? "" :this.genderFromControl.value,
        date_of_birth: this.dateOfBirthFromControl.value == null ? "" :this.formatDate(this.dateOfBirthFromControl.value),
        role: this.roleFormControl.value == null ? "" :this.roleFormControl.value,
        password: this.passwordFormControl.value == null ? "" :this.passwordFormControl.value,
      } 
      this.addEmployeeService.addEmployee(request);
  }



  formatDate(dateString: string | null): string {
    if(dateString == null){
      return "";
    }
    const date = new Date(dateString);
  
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }

}
