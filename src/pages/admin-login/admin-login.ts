import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.scss']
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ email: email!, password: password! }).subscribe({
        next: () => {
          this.router.navigate(['/admin']); // Успех — в админку
        },
        error: (err) => {
          this.errorMessage = 'Неверный логин или пароль';
        }
      });
    }
  }
}