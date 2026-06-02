import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService, UserProfile } from '../../services/supabase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit, OnDestroy {
  userName = '';
  showContent = false;
  private autoTimer: any;
  private sub: Subscription | null = null;

  constructor(private router: Router, private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.sub = this.supabase.currentProfile$.subscribe(profile => {
      if (profile) {
        this.userName = profile.full_name?.split(' ')[0] || 'Explorateur';
      }
    });
    setTimeout(() => (this.showContent = true), 300);
  }

  ngOnDestroy(): void {
    clearTimeout(this.autoTimer);
    this.sub?.unsubscribe();
  }

  continue(): void {
    this.router.navigate(['/selection']);
  }
}
