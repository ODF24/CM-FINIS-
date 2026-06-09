import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

interface Destination {
  id: string; lieu: string; nom: string; image: string;
  videoUrl: string; categorie: string; description: string; histoire: string;
}

@Component({
  selector: 'app-patrimoine',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './patrimoine.component.html',
  styleUrls: ['./patrimoine.component.css']

})
export class PatrimoineComponent {
  detail: Destination | null = null;

  destinations: Destination[] = [
    {
      id: 'memorial-brazza', lieu: 'CONGO BRAZZAVILLE', nom: 'Mémorial Pierre Savorgnan de Brazza',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780266786/istockphoto-510334279-170667a_bbm4e0.jpg',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', categorie: 'Monument',
      description: 'Mausolée dédié à l\'explorateur Pierre Savorgnan de Brazza, fondateur de Brazzaville, un lieu de mémoire incontournable.',
      histoire: 'Inauguré en 2006, le Mémorial Pierre Savorgnan de Brazza est un site architectural remarquable érigé à la mémoire de l\'explorateur italo-français qui fonda Brazzaville en 1880. Situé sur les rives du fleuve Congo, il offre une vue imprenable sur Kinshasa et constitue un symbole de la réconciliation entre les peuples.'
    },
    {
      id: 'poto-poto', lieu: 'CONGO BRAZZAVILLE', nom: 'École de Peinture de Poto-Poto',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780266556/df0dd53b-0171-4d14-8893-00905049ebfd_alhb7y.png',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', categorie: 'Art & Culture',
      description: 'Fondée en 1951, l\'École de Peinture de Poto-Poto est l\'une des plus importantes institutions artistiques d\'Afrique subsaharienne.',
      histoire: 'L\'École de Peinture de Poto-Poto fut fondée en 1951 par Pierre Lods dans le quartier populaire de Poto-Poto. Elle a formé des générations d\'artistes dont les œuvres colorées ont rayonné dans le monde entier. Ses toiles ornent aujourd\'hui les plus grands musées du monde.'
    },
    {
      id: 'chutes-loufoulakari', lieu: 'CONGO BRAZZAVILLE', nom: 'Les Chutes de la Loufoulakari',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780266451/472625942_1124210472410802_4750837940876351688_n_tnh1my.jpg',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', categorie: 'Nature',
      description: 'Parmi les plus belles cascades d\'Afrique centrale, les chutes de la Loufoulakari sont un joyau naturel à deux heures de Brazzaville.',
      histoire: 'Les chutes de la Loufoulakari sont situées à environ 120 km de Brazzaville. Alimentées par la rivière Loufoulakari, elles plongent de plusieurs dizaines de mètres dans un cadre naturel préservé d\'une beauté saisissante, entourées d\'une végétation luxuriante et d\'une faune riche.'
    },
    {
      id: 'fleuve-congo', lieu: 'CONGO BRAZZAVILLE', nom: 'Le Fleuve Congo',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780266676/Fleuve_Congo_Vue_a%C3%A9rienne_uf59sl.jpg',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', categorie: 'Nature',
      description: 'Deuxième fleuve d\'Afrique par son débit, le fleuve Congo est l\'âme du pays et offre des paysages d\'une grandeur incomparable.',
      histoire: 'Le fleuve Congo, deuxième fleuve du monde par son débit, est le cœur battant de la République du Congo. Avec ses 4 700 km de longueur, il constitue une voie de communication essentielle et un écosystème d\'une biodiversité exceptionnelle. Une croisière sur le fleuve reste une expérience inoubliable.'
    }
  ];

  ouvrirDetail(dest: Destination): void { this.detail = dest; window.scrollTo(0, 0); }
  retour(): void { this.detail = null; window.scrollTo(0, 0); }
}
