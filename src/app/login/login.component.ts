import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FormComponent , FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
