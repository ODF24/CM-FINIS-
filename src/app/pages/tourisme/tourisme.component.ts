import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

interface Site {
  id: string; lieu: string; nom: string; image: string;
  videoUrl: string; visiteUrl: string; description: string; histoire: string;
}

@Component({
  selector: 'app-tourisme',
  standalone: true,
  imports: [CommonModule, SafePipe],
 templateUrl: './tourisme.component.html',
  styleUrls: ['./tourisme.component.css']
})
export class TourismeComponent {
  detail: Site | null = null;

  sites: Site[] = [
    { id: 'sainte-anne', lieu: 'CONGO BRAZZAVILLE', nom: 'Basilique Sainte Anne',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sainte_Anne_du_Congo_-_Brazzaville.jpg/800px-Sainte_Anne_du_Congo_-_Brazzaville.jpg',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', visiteUrl: '#',
      description: 'Joyau de l\'architecture religieuse congolaise, la Basilique Sainte-Anne se dresse fièrement au cœur de Brazzaville.',
      histoire: 'Construite entre 1935 et 1949 par les Pères du Saint-Esprit, la basilique Sainte-Anne est un chef-d\'œuvre de l\'art roman en terre africaine. Son clocher vert-de-gris visible de loin est devenu l\'un des symboles iconiques de Brazzaville. Elle accueille chaque année des milliers de fidèles et de visiteurs venus admirer ses fresques intérieures, son architecture unique mêlant influences européennes et touches africaines.' },
    { id: 'domaine-mbe', lieu: 'CONGO BRAZZAVILLE · NGABE', nom: 'Domaine royal de Mbé',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Teke_man.jpg',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', visiteUrl: '#',
      description: 'Cœur ancestral du royaume Téké, le domaine royal de Mbé perpétue les traditions et la royauté du peuple Téké.',
      histoire: 'Le Domaine royal de Mbé est le siège traditionnel du Makoko, roi des Batékés. Ce site historique exceptionnel témoigne de la grandeur du Royaume Téké qui dominait une vaste région d\'Afrique Centrale avant la colonisation. Le Makoko règne encore aujourd\'hui sur ce domaine préservé, où se perpétuent des rituels ancestraux, des danses cérémoniales et un artisanat d\'une richesse incomparable.' },
    { id: 'musee-national', lieu: 'CONGO BRAZZAVILLE', nom: 'Musée National du Congo',
      image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=70',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', visiteUrl: '#',
      description: 'Gardien de la mémoire collective congolaise, le Musée National rassemble les trésors culturels et historiques du pays.',
      histoire: 'Le Musée National du Congo abrite plus de 10 000 pièces uniques : sculptures, masques, instruments de musique, textiles, archives photographiques et documents historiques qui retracent l\'histoire du Congo depuis les royaumes précoloniaux jusqu\'à l\'époque contemporaine. Un espace de transmission de la mémoire collective indispensable.' },
    { id: 'fespam', lieu: 'CONGO BRAZZAVILLE', nom: 'Festival Panafricain De Musique, Fespam',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=70',
      videoUrl: 'https://www.youtube.com/embed/5UdE4j-V5Ak', visiteUrl: '#',
      description: 'Célébration majeure de la musique africaine, le FESPAM réunit tous les deux ans à Brazzaville les meilleurs artistes du continent.',
      histoire: 'Fondé en 1994, le Festival Panafricain de Musique (FESPAM) est devenu l\'un des événements culturels les plus importants d\'Afrique. Organisé tous les deux ans à Brazzaville, il accueille des artistes de plus de 40 pays africains et valorise les musiques traditionnelles et contemporaines.' }
  ];

  ouvrirDetail(site: Site): void { this.detail = site; window.scrollTo(0, 0); }
  retour(): void { this.detail = null; window.scrollTo(0, 0); }
}
