import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

type View = 'login' | 'forgot' | 'forgot-sent';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  view: View = 'login';

  // Login
  email = '';
  password = '';
  showPassword = false;
  loading = false;
  error = '';

  // Forgot password
  forgotEmail = '';
  forgotLoading = false;
  forgotError = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }
    this.error = '';
    this.loading = true;
    const { error } = await this.supabase.signIn(this.email, this.password);
    this.loading = false;
    if (error) {
      this.error = this.translateError(error);
    } else {
      this.router.navigate(['/home']);
    }
  }

  async onForgotSubmit(): Promise<void> {
    if (!this.forgotEmail) {
      this.forgotError = 'Veuillez saisir votre adresse email.';
      return;
    }
    this.forgotError = '';
    this.forgotLoading = true;
    const { error } = await this.supabase.resetPassword(this.forgotEmail);
    this.forgotLoading = false;
    if (error) {
      this.forgotError = this.translateError(error);
    } else {
      this.view = 'forgot-sent';
    }
  }

  goToForgot(): void {
    this.forgotEmail = this.email; // pré-remplir avec l'email saisi
    this.forgotError = '';
    this.view = 'forgot';
  }

  backToLogin(): void {
    this.error = '';
    this.view = 'login';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  private translateError(msg: string): string {
    if (msg.includes('Invalid login')) return 'Email ou mot de passe incorrect.';
    if (msg.includes('Email not confirmed')) return 'Veuillez confirmer votre email avant de vous connecter.';
    if (msg.includes('Too many requests')) return 'Trop de tentatives. Réessayez dans quelques minutes.';
    if (msg.includes('User not found')) return 'Aucun compte associé à cet email.';
    return msg;
  }
}
