import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  constructor(private router: Router) {}

  choisir(plan: string): void {
    if (plan === 'gratuit') {
      this.router.navigate(['/']);
    } else {
      alert('Paiement Premium — Intégration à venir.');
    }
  }
}
