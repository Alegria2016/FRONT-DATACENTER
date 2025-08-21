import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecargaService } from '../../../core/service/recarga.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  isAuthenticated = false;
  userName = '';
  userEmail = '';
  userAvatar = 'assets/images/default-avatar.svg';
  

  private router = inject(Router);
  private recargaService = inject(RecargaService);

  constructor() {
   
  }

 
}