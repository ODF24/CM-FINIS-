import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService, UserProfile } from '../../services/supabase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'topbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  patrimoineOpen = false;
  userMenuOpen = false;
  isLoggedIn = false;
  profile: UserProfile | null = null;
  private sub: Subscription | null = null;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.sub = this.supabase.currentProfile$.subscribe(p => {
      this.profile = p;
      this.isLoggedIn = p !== null;
    });
    // Aussi écouter si profile null mais user existe
    this.supabase.currentUser$.subscribe(u => {
      if (!u) { this.isLoggedIn = false; this.profile = null; }
      else this.isLoggedIn = true;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get initials(): string {
    if (!this.profile?.full_name) return '?';
    return this.profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  togglePatrimoine(event: Event) {
    if (window.innerWidth < 1100) {
      event.preventDefault();
      this.patrimoineOpen = !this.patrimoineOpen;
    }
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
  }

  @HostListener('document:click')
  closeMenus() {
    this.userMenuOpen = false;
    this.patrimoineOpen = false;
  }

  async logout(event: Event) {
    event.stopPropagation();
    this.userMenuOpen = false;
    await this.supabase.signOut();
  }
}
