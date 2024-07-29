import {Component} from '@angular/core';
import { FormComponent } from './form/form.component';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  imports:[FormComponent]
})
export class AddEmployeeComponent {

}
