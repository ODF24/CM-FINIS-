import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

interface ArtWork {
  id: number; titre: string; artiste: string; prix: number;
  categorie: 'peinture' | 'sculpture' | 'masque' | 'tissu';
  image: string; badge: string; badgeColor: string;
  description: string; dimensions: string; annee: string;
}

@Component({
  selector: 'app-marche-art',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marche-art.component.html',
  styleUrls: ['./marche-art.component.css']
})
export class MarcheArtComponent {
  filtreActif = 'tout';
  modalOeuvre: ArtWork | null = null;
  modalView: 'detail' | 'form' | 'sent' = 'detail';
  formNom = ''; formEmail = ''; formMessage = '';
  formLoading = false;

  filtres = [
    { id: 'tout', label: 'Tout' }, { id: 'peinture', label: 'Peinture' },
    { id: 'sculpture', label: 'Sculpture' }, { id: 'masque', label: 'Masque' },
    { id: 'tissu', label: 'Tissu' },{ id: 'Art numérique/nft', label: 'Art numérique/nft' },
  ];

  oeuvres: ArtWork[] = [
    { id: 1, titre: 'Masque Téké de la Savane', artiste: 'Makaya Kiesse', prix: 85000, categorie: 'masque', image: 'https://images.unsplash.com/photo-1577083553180-732e6f0fb6c6?w=400&q=80', badge: 'EN VEDETTE', badgeColor: '#c8973a', description: 'Masque cérémoniel Téké sculpté dans le bois d\'iroko, utilisé lors des rituels d\'initiation du peuple Téké du Congo.', dimensions: '32 × 18 cm', annee: '2023' },
    { id: 2, titre: 'Sculpture Kongo Ancestrale', artiste: 'Malela Nsimba', prix: 120000, categorie: 'sculpture', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80', badge: 'NOUVEAU', badgeColor: '#2e7d32', description: 'Sculpture nkisi inspirée de la tradition Kongo. Réalisée en bois de padouk et ornée de pigments naturels.', dimensions: '45 × 12 cm', annee: '2024' },
    { id: 3, titre: 'Masque Cérémonie du Fleuve', artiste: 'Kuleta Mwamba', prix: 95000, categorie: 'masque', image: 'https://images.unsplash.com/photo-1547235001-d703406d3f17?w=400&q=80', badge: 'RARE', badgeColor: '#8b0000', description: 'Masque rituel lié aux cérémonies du fleuve Congo. Pièce unique teintée avec des argiles naturelles du bassin congolais.', dimensions: '28 × 22 cm', annee: '2022' },
    { id: 4, titre: 'Peinture Savane Congolaise', artiste: 'Bosama Lelo', prix: 65000, categorie: 'peinture', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80', badge: 'EN VEDETTE', badgeColor: '#c8973a', description: 'Acrylique sur toile représentant le coucher de soleil sur la savane au nord du Congo. Palette chaude et vibrante.', dimensions: '80 × 60 cm', annee: '2024' },
    { id: 5, titre: 'Tissu Wax Traditionnel', artiste: 'Fatou Mbemba', prix: 42000, categorie: 'tissu', image: 'https://images.unsplash.com/photo-1573033855847-f98e7b278cc4?w=400&q=80', badge: 'POPULAIRE', badgeColor: '#1565c0', description: 'Tissu wax authentique tissé à la main selon les techniques ancestrales congolaises. Motifs géométriques inspirés de l\'art Téké.', dimensions: '3 m × 1,2 m', annee: '2024' },
    { id: 6, titre: 'Peinture Fleuve Congo', artiste: 'Nzinga Bateke', prix: 78000, categorie: 'peinture', image: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=400&q=80', badge: 'NOUVEAU', badgeColor: '#2e7d32', description: 'Huile sur toile figurant la majesté du fleuve Congo au crépuscule, depuis les berges de Brazzaville.', dimensions: '100 × 70 cm', annee: '2024' },
    { id: 7, titre: 'Masque Suku du Nord', artiste: 'Loemba Kosi', prix: 110000, categorie: 'masque', image: 'https://images.unsplash.com/photo-1577083552792-a0d461cb1dd6?w=400&q=80', badge: 'RARE', badgeColor: '#8b0000', description: 'Masque Suku du nord-Congo, sculpté en bois de mungongo. Témoignage précieux d\'une tradition quasi disparue.', dimensions: '35 × 20 cm', annee: '2021' },
    { id: 8, titre: 'Sculpture Esprit de la Forêt', artiste: 'Bilanga Nseke', prix: 145000, categorie: 'sculpture', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80', badge: 'EXCLUSIF', badgeColor: '#4a148c', description: 'Sculpture monumentale représentant l\'esprit tutélaire de la forêt équatoriale. Bois d\'ébène, pièce unique numérotée.', dimensions: '60 × 15 cm', annee: '2023' },
  ];

  constructor(private supabase: SupabaseService) {
    // Pré-remplir avec les infos du user connecté
    const profile = this.supabase.currentProfile;
    if (profile) {
      this.formNom = profile.full_name;
      this.formEmail = profile.email;
    }
  }

  get oeuvresFiltrees(): ArtWork[] {
    return this.filtreActif === 'tout' ? this.oeuvres : this.oeuvres.filter(o => o.categorie === this.filtreActif);
  }

  setFiltre(id: string): void { this.filtreActif = id; }
  formaterPrix(p: number): string { return p.toLocaleString('fr-FR') + ' FCFA'; }

  openModal(o: ArtWork): void {
    this.modalOeuvre = o;
    this.modalView = 'detail';
    this.formMessage = '';
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOeuvre = null;
    document.body.style.overflow = '';
  }

  goToForm(): void { this.modalView = 'form'; }
  backToDetail(): void { this.modalView = 'detail'; }

  async submitForm(): Promise<void> {
    if (!this.formNom || !this.formEmail) return;
    this.formLoading = true;
    await new Promise(r => setTimeout(r, 1400)); // Simuler envoi
    this.formLoading = false;
    this.modalView = 'sent';
  }
}
