import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupabaseService, UserProfile } from '../../services/supabase.service';
import { Subscription } from 'rxjs';

interface StatCard {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface QuickLink {
  icon: string;
  label: string;
  route: string;
  desc: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  profile: UserProfile | null = null;
  private sub: Subscription | null = null;

  userTypeLabels: Record<string, { label: string; icon: string; color: string }> = {
    touriste:    { label: 'Touriste',      icon: '🌍', color: '#1565c0' },
    etudiant:    { label: 'Étudiant',      icon: '🎓', color: '#2e7d32' },
    diaspora:    { label: 'Diaspora',      icon: '✈️',  color: '#6a1b9a' },
    chercheur:   { label: 'Chercheur',     icon: '🔬', color: '#8b0000' },
  };

  stats: StatCard[] = [
    { icon: '🏛️', label: 'Pages visitées',     value: '8',      color: '#c8973a' },
    { icon: '🎨', label: 'Œuvres consultées',  value: '12',     color: '#2e7d32' },
    { icon: '📍', label: 'Départements vus',   value: '5',      color: '#1565c0' },
    { icon: '⭐', label: 'Favoris',            value: '3',      color: '#8b0000' },
  ];

  quickLinks: QuickLink[] = [
    { icon: '📜', label: 'Histoire du Congo',   route: '/histoire',   desc: 'Présidents et chronologie' },
    { icon: '🎨', label: 'Marché d\'Art',       route: '/marche-art', desc: 'Œuvres authentiques' },
    { icon: '🏔️', label: 'Patrimoine',          route: '/patrimoine', desc: 'Sites touristiques' },
    { icon: '📰', label: 'Actualités',          route: '/actualites', desc: 'Dernières nouvelles' },
    { icon: '🌿', label: 'Tourisme',            route: '/tourisme',   desc: 'Destinations Congo' },
    { icon: '⭐', label: 'Premium',             route: '/paiement',   desc: 'Accès illimité' },
  ];

  ngOnInit(): void {
    this.sub = this.supabase.currentProfile$.subscribe(p => {
      this.profile = p;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get userTypeInfo() {
    if (!this.profile?.user_type) return null;
    return this.userTypeLabels[this.profile.user_type] ?? null;
  }

  get initials(): string {
    if (!this.profile?.full_name) return '?';
    return this.profile.full_name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  get memberSince(): string {
    if (!this.profile?.created_at) return '';
    const d = new Date(this.profile.created_at);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
  }

  constructor(private supabase: SupabaseService) {}
}
