import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../auth/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, ButtonComponent , MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService : AuthService = inject(AuthService);
  showHeadderButtons: Signal<boolean> = 
    computed<boolean>(()=>
      this.authService.isLoggedIn()
    );
  
    logout(): void{
      this.authService.logout();
    }
}
