import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

interface UserType {
  id: string;
  icon: string;
  label: string;
  desc: string;
  color: string;
}

@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  selected: string | null = null;
  loading = false;
  showContent = false;

  userTypes: UserType[] = [
    { id: 'touriste',   icon: '✈️',  label: 'Touriste',       desc: 'Je découvre le Congo pour la première fois',          color: '#4ECDC4' },
    { id: 'etudiant',   icon: '📚',  label: 'Étudiant',       desc: 'J\'explore pour apprendre et enrichir mes connaissances', color: '#C8973A' },
    { id: 'diaspora',   icon: '🌍',  label: 'Diaspora',       desc: 'Je suis congolais(e) vivant à l\'étranger',           color: '#A8E063' },
    { id: 'chercheur',  icon: '🔬',  label: 'Chercheur',      desc: 'Je mène des recherches sur le Congo',                 color: '#B388FF' },
    { id: 'congolais',  icon: '🇨🇬', label: 'Congolais(e)',   desc: 'Je vis et j\'explore mon propre pays',                color: '#FF8A65' },
    { id: 'passionné',  icon: '❤️',  label: 'Passionné(e)',   desc: 'Je suis fasciné(e) par l\'Afrique et sa culture',     color: '#F06292' },
  ];

  constructor(private router: Router, private supabase: SupabaseService) {}

  ngOnInit(): void {
    setTimeout(() => (this.showContent = true), 200);
  }

  select(id: string): void {
    this.selected = id;
  }

  async confirm(): Promise<void> {
    if (!this.selected || this.loading) return;
    this.loading = true;

    const user = this.supabase.currentUser;
    if (user) {
      await this.supabase.updateUserType(this.selected);
    }

    this.router.navigate(['/immersion']);
  }
}
