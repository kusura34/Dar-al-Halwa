import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
 private authService = inject(AuthService);
 private router: Router = inject(Router)

 logout() {
  this.router.navigate([])
  this.authService.logout()
 }
}
