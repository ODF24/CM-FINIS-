import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

type View = 'form' | 'success' | 'expired';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  view: View = 'form';
  newPassword = '';
  confirmPassword = '';
  showNew = false;
  showConfirm = false;
  loading = false;
  error = '';

  private supabase = createClient(environment.supabase.url, environment.supabase.anonKey);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token')) {
      this.view = 'expired';
    }
  }

  // ── Getters force mot de passe ──────────────────
  get hasMinLength(): boolean  { return this.newPassword.length >= 8; }
  get hasUppercase(): boolean  { return /[A-Z]/.test(this.newPassword); }
  get hasNumber(): boolean     { return /[0-9]/.test(this.newPassword); }
  get passwordsMatch(): boolean { return this.newPassword === this.confirmPassword && this.confirmPassword.length > 0; }
  get passwordsDontMatch(): boolean { return this.confirmPassword.length > 0 && this.newPassword !== this.confirmPassword; }

  get strength(): number {
    let s = 0;
    if (this.hasMinLength) s++;
    if (this.hasUppercase) s++;
    if (this.hasNumber) s++;
    if (/[^A-Za-z0-9]/.test(this.newPassword)) s++;
    return s;
  }
  get strengthLabel(): string { return ['', 'Faible', 'Moyen', 'Bon', 'Fort'][this.strength]; }
  get strengthColor(): string { return ['', '#e53935', '#fb8c00', '#43a047', '#00897b'][this.strength]; }
  get strengthWidth(): string { return (this.strength / 4 * 100) + '%'; }

  async onSubmit(): Promise<void> {
    if (!this.hasMinLength) { this.error = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }
    if (!this.passwordsMatch)  { this.error = 'Les mots de passe ne correspondent pas.'; return; }
    this.error = '';
    this.loading = true;

    const { error } = await this.supabase.auth.updateUser({ password: this.newPassword });
    this.loading = false;

    if (error) {
      this.error = error.message.includes('expired')
        ? 'Le lien a expiré. Faites une nouvelle demande.'
        : error.message;
    } else {
      this.view = 'success';
      setTimeout(() => this.router.navigate(['/inscription']), 2500);
    }
  }

  goToLogin(): void { this.router.navigate(['/inscription']); }
  goToForgot(): void { this.router.navigate(['/inscription']); }
}
