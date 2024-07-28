import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterLink]
})
export class ButtonComponent {
  @Input() url?:string;
}
