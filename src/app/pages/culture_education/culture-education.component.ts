import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CultureItem {
  id: number;
  category: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-culture-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './culture-education.component.html',
  styleUrls: ['./culture-education.component.css']
})
export class CultureEducationComponent implements OnInit {
  
  // Catégories issues du menu de sélection
  categories = [
    { id: 'all', label: 'Tout explorer' },
    { id: 'poesie', label: 'Poésie' },
    { id: 'contes', label: 'Contes' },
    { id: 'jeux', label: "Jeux d'enfance" },
    { id: 'culture-g', label: 'Jeux Culture Générale' }
  ];

  selectedCategory: string = 'all';

  // Base de données structurée des récits pour alimenter dynamiquement la grille
  cultureData: CultureItem[] = [
    { id: 1, category: 'contes', title: 'Le Lièvre malin', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 2, category: 'contes', title: 'Le Secret du Baobab', description: 'Pourquoi le baobab a-t-il les racines vers le ciel ? Un conte cosmogonique.' },
    { id: 3, category: 'contes', title: 'Mami Wata', description: 'La légende de la sirène du fleuve qui protège les eaux sacrées.' },
    { id: 4, category: 'contes', title: 'Le Lièvre et l\'Éléphant', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 5, category: 'contes', title: 'Le Lièvre et l\'Éléphant', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 6, category: 'contes', title: 'Le Lièvre et l\'Éléphant', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 7, category: 'contes', title: 'Le Lièvre et l\'Éléphant', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 8, category: 'contes', title: 'Le Lièvre et l\'Éléphant', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 9, category: 'contes', title: 'Le Lièvre et l\'Éléphant', description: 'Une leçon de ruse et de sagesse venue des rives de la Sangha.' },
    { id: 10, category: 'poesie', title: 'Chants du Congo', description: 'Poème rythmé célébrant la beauté du fleuve majestueux et des forêts.' },
    { id: 11, category: 'jeux', title: 'Nzango', description: 'Le jeu traditionnel de pieds et de mains devenu un sport national compétitif.' }
  ];

  filteredItems: CultureItem[] = [];
  featuredItems: CultureItem[] = [];

  ngOnInit(): void {
    // Initialisation avec toutes les données
    this.filteredItems = [...this.cultureData];
    // Les 3 premières cartes mises en avant (Section du haut)
    this.featuredItems = this.cultureData.slice(0, 3);
  }

  // Permet de filtrer en temps réel au clic sur une catégorie
  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    if (categoryId === 'all') {
      this.filteredItems = [...this.cultureData];
    } else {
      this.filteredItems = this.cultureData.filter(item => item.category === categoryId);
    }
  }

  // Renvoie dynamiquement le titre en fonction du filtre
  getCategoryTitle(): string {
    switch(this.selectedCategory) {
      case 'contes': return 'Les Contes Congolais';
      case 'poesie': return 'Poésies et Récitals';
      case 'jeux': return 'Jeux d\'Enfance Traditionnels';
      case 'culture-g': return 'Quiz de Culture Générale';
      default: return 'Tous les Récits Disponibles';
    }
  }

  // Fonctions de navigation fluide (Scroll)
  scrollToGrid(): void {
    const element = document.getElementById('explore-grid-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}