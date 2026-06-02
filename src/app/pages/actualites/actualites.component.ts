import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Article {
  id: number; categorie: string; titre: string;
  extrait: string; date: string; image: string; tag: string;
}

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent {
  filtreActif = 'tout';
  filtres = ['tout','culture','tourisme','économie','politique','sport'];

  articles: Article[] = [
    { id:1, categorie:'culture', titre:'Le FESPAM revient en force à Brazzaville', extrait:'La 12ᵉ édition du Festival Panafricain de Musique promet d\'accueillir plus de 500 artistes venus des quatre coins du continent africain.', date:'15 mai 2025', image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=70', tag:'🎵 Culture' },
    { id:2, categorie:'tourisme', titre:'Les chutes de la Loufoulakari classées site naturel protégé', extrait:'Le gouvernement annonce la protection officielle des chutes de la Loufoulakari et le lancement d\'un programme d\'écotourisme durable.', date:'10 mai 2025', image:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70', tag:'🌿 Tourisme' },
    { id:3, categorie:'économie', titre:'Le Port de Pointe-Noire modernise ses infrastructures', extrait:'Un investissement de 800 millions USD va transformer le port de Pointe-Noire en hub logistique de référence pour toute l\'Afrique centrale.', date:'8 mai 2025', image:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=70', tag:'💼 Économie' },
    { id:4, categorie:'culture', titre:'Le Musée National du Congo expose ses nouvelles acquisitions', extrait:'Plus de 200 nouvelles pièces rejoignent les collections permanentes du Musée National, dont de rares sculptures Téké du XIXᵉ siècle.', date:'5 mai 2025', image:'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=70', tag:'🏛️ Culture' },
    { id:5, categorie:'sport', titre:'Les Diables Rouges se qualifient pour la CAN 2025', extrait:'L\'équipe nationale du Congo réalise une performance historique et rejoint pour la première fois depuis 10 ans la phase finale de la Coupe d\'Afrique des Nations.', date:'2 mai 2025', image:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=70', tag:'⚽ Sport' },
    { id:6, categorie:'tourisme', titre:'Congo Metaverse lance ses visites virtuelles 3D', extrait:'La plateforme Congo Metaverse dévoile ses premières visites immersives en 3D des sites patrimoniaux les plus emblématiques du pays.', date:'28 avril 2025', image:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=70', tag:'🌍 Tourisme' },
  ];

  get articlesFiltres(): Article[] {
    return this.filtreActif === 'tout' ? this.articles : this.articles.filter(a => a.categorie === this.filtreActif);
  }
}
