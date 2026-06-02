import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirm = false;
  loading = false;
  error = '';
  success = false;

  constructor(private supabase: SupabaseService, private router: Router) {}

  // ── Getters utilisés dans le template (pas de regex dans HTML) ──
  get hasMinLength(): boolean   { return this.password.length >= 8; }
  get hasUppercase(): boolean   { return /[A-Z]/.test(this.password); }
  get hasNumber(): boolean      { return /[0-9]/.test(this.password); }
  get passwordsMatch(): boolean { return this.password === this.confirmPassword && this.confirmPassword.length > 0; }
  get passwordsDontMatch(): boolean { return this.confirmPassword.length > 0 && this.password !== this.confirmPassword; }

  get passwordStrength(): number {
    let s = 0;
    if (this.hasMinLength) s++;
    if (this.hasUppercase) s++;
    if (this.hasNumber) s++;
    if (/[^A-Za-z0-9]/.test(this.password)) s++;
    return s;
  }
  get strengthLabel(): string { return ['', 'Faible', 'Moyen', 'Bon', 'Fort'][this.passwordStrength]; }
  get strengthColor(): string { return ['', '#e53935', '#fb8c00', '#43a047', '#00897b'][this.passwordStrength]; }
  get strengthWidth(): string { return (this.passwordStrength / 4 * 100) + '%'; }

  async onSubmit(): Promise<void> {
    if (!this.fullname.trim())     { this.error = 'Veuillez saisir votre nom complet.'; return; }
    if (!this.email)               { this.error = 'Veuillez saisir votre email.'; return; }
    if (!this.hasMinLength)        { this.error = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }
    if (!this.passwordsMatch)      { this.error = 'Les mots de passe ne correspondent pas.'; return; }

    this.error = '';
    this.loading = true;
    const { error } = await this.supabase.signUp(this.email, this.password, this.fullname.trim());
    this.loading = false;

    if (error) {
      this.error = this.translateError(error);
    } else {
      this.success = true;
      setTimeout(() => this.router.navigate(['/welcome']), 2200);
    }
  }

  private translateError(msg: string): string {
    if (msg.includes('already registered') || msg.includes('already exists')) return 'Un compte existe déjà avec cet email.';
    if (msg.includes('Password should be')) return 'Le mot de passe doit contenir au moins 8 caractères.';
    if (msg.includes('valid email'))        return 'Veuillez saisir une adresse email valide.';
    if (msg.includes('Too many requests'))  return 'Trop de tentatives. Réessayez dans quelques minutes.';
    return msg;
  }
}
