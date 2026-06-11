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
    {
      id: 'Sainte-anne', lieu: 'CONGO BRAZZAVILLE', nom: 'Basilique Sainte Anne',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780995909/basilique_lvda1r.jpg',
      videoUrl: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354027/La_basilique_Sainte_Anne_de_Brazzaville_et_son_histoire_ryb0xc.mp4',
      visiteUrl: '#',
      description: 'Joyau de l\'architecture religieuse congolaise, la Basilique Sainte-Anne se dresse fièrement au cœur de Brazzaville.',
      histoire: 'Construite entre 1935 et 1949 par les Pères du Saint-Esprit, la basilique Sainte-Anne est un chef-d\'œuvre de l\'art roman en terre africaine. Son clocher vert-de-gris visible de loin est devenu l\'un des symboles iconiques de Brazzaville. Elle accueille chaque année des milliers de fidèles et de visiteurs venus admirer ses fresques intérieures, son architecture unique mêlant influences européennes et touches africaines.'
    },
    {
      id: 'Domaine-mbe', lieu: 'CONGO BRAZZAVILLE · NGABE', nom: 'Domaine royal de Mbé',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780265813/unnamed_3_zc0nis.jpg',
      videoUrl: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354033/Royaume_t%C3%A9k%C3%A9___visite_des_chefs_coutumiers_du_groupement_nguma_%C3%A0_mb%C3%A9_1_yj1voh.mp4', visiteUrl: '#',
      description: 'Cœur ancestral du royaume Téké, le domaine royal de Mbé perpétue les traditions et la royauté du peuple Téké.',
      histoire: 'Le Domaine royal de Mbé est le siège traditionnel du Makoko, roi des Batékés. Ce site historique exceptionnel témoigne de la grandeur du Royaume Téké qui dominait une vaste région d\'Afrique Centrale avant la colonisation. Le Makoko règne encore aujourd\'hui sur ce domaine préservé, où se perpétuent des rituels ancestraux, des danses cérémoniales et un artisanat d\'une richesse incomparable.'
    },
    {
      id: 'Musee-national', lieu: 'CONGO BRAZZAVILLE', nom: 'Musée National du Congo',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780266244/Tio_zvzolq.jpg',
      videoUrl: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776352771/CONGO__Mus%C3%A9e_de_l_Histoire_du_CONGO_-_BRAZZAVILLE_gaz6zd.mp4', visiteUrl: '#',
      description: 'Gardien de la mémoire collective congolaise, le Musée National rassemble les trésors culturels et historiques du pays.',
      histoire: 'Le Musée National du Congo abrite plus de 10 000 pièces uniques : sculptures, masques, instruments de musique, textiles, archives photographiques et documents historiques qui retracent l\'histoire du Congo depuis les royaumes précoloniaux jusqu\'à l\'époque contemporaine. Un espace de transmission de la mémoire collective indispensable.'
    },
    {
      id: 'Fespam', lieu: 'CONGO BRAZZAVILLE', nom: 'Festival Panafricain De Musique, Fespam',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1780266280/509429587_122125786370724897_6625211251855857747_n_hpai6e.jpg',
      videoUrl: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354039/Fespam__les_h%C3%A9ro%C3%AFnes_une_cr%C3%A9ation_documentaire_sur_la_rumba_congolaise_pr%C3%A9s_rny60u.mp4', visiteUrl: '#',
      description: 'Célébration majeure de la musique africaine, le FESPAM réunit tous les deux ans à Brazzaville les meilleurs artistes du continent.',
      histoire: 'Fondé en 1994, le Festival Panafricain de Musique (FESPAM) est devenu l\'un des événements culturels les plus importants d\'Afrique. Organisé tous les deux ans à Brazzaville, il accueille des artistes de plus de 40 pays africains et valorise les musiques traditionnelles et contemporaines.'
    },
    {
      id: 'Fresque', lieu: 'CONGO BRAZZAVILLE', nom: 'Fresque le  Peuple Parle Au Peuple',
      image: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1781004409/congo76_rpihou.jpg',
      videoUrl: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354039/Fespam__les_h%C3%A9ro%C3%AFnes_une_cr%C3%A9ation_documentaire_sur_la_rumba_congolaise_pr%C3%A9s_rny60u.mp4',
      visiteUrl: 'https://2026-eta-ruby.vercel.app/',
      description: 'Fresque artistique engagée représentant la voix du peuple congolais, exprimant ses luttes, ses espoirs et son unité à travers l’art mural contemporain.',
      histoire: 'La fresque “Le Peuple Parle Au Peuple” est une œuvre symbolique née dans une démarche de valorisation de l’expression populaire en République du Congo. Elle met en avant la communication directe entre les citoyens à travers l’art urbain, en illustrant les réalités sociales, culturelles et politiques du pays. Elle s’inscrit dans une dynamique de renaissance artistique africaine où la rue devient un espace d’expression et de mémoire collective.'
    }
  ];

  ouvrirDetail(site: Site): void { this.detail = site; window.scrollTo(0, 0); }
  retour(): void { this.detail = null; window.scrollTo(0, 0); }
  allerAVisite(url: string, event: Event): void {
    event.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      alert('La visite virtuelle 3D pour ce site n\'est pas encore disponible.');
    }
  }
}
