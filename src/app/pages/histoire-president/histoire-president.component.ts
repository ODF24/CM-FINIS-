import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PresidentData {
  nom: string;
  img: string;
  video: string;
  bio: string;
  naissance: string; deces: string; fonctions: string;
  mandat: string; parti: string; conjoint?: string;
}

@Component({
  selector: 'app-histoire-president',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './histoire-president.component.html',
  styleUrls: ['./histoire-president.component.css']
})
export class HistoirePresidentComponent implements OnInit {
  president: PresidentData | null = null;

  private data: Record<string, PresidentData> = {
    alphonse: {
      nom: 'Alphonse Massamba-Débat',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354070/ALPHONSE_MASSAMBA-D%C3%89BAT___H%C3%89RITAGE_POLITIQUE_ET_LE%C3%87ONS_POUR_LE_CONGO_D_AUJOURD_H_qexeqo.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1776352525/Stamp_of_Congo__Republic__Brazzaville__-_1965_-_Colnect_675065_-_Pr%C3%A9sident_Massamba_Debat__cropped_m9is3l.jpg',
      bio: "Alphonse Massamba-Débat est un homme d'État congolais né en 1921 à Nkolo dans le district de Boko et mort le 25 mars 1977 à Brazzaville. Il est président de la République du Congo de 1963 à 1968.",
      naissance: '1921, Nkolo', deces: '25 mars 1977, Brazzaville',
      fonctions: 'Président du Congo (1963–1968), Premier ministre (1963)',
      mandat: '19 décembre 1963 – 4 septembre 1968',
      parti: 'Mouvement national de la révolution',
      conjoint: 'Marie Massamba-Débat'
    },
    fulbert: {
      nom: 'Fulbert Youlou',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354080/L_HISTOIRE_FULBERT_YOULOU___DE_L_AUTEL_AU_POUVOIR_LA_CHUTE_DU_PREMIER_PR%C3%89SIDENT_ri2mgd.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1777885803/fulbert_youlou_njgxyr.jpg',
      bio: "Fulbert Youlou est le premier président de la République du Congo. Il accède au pouvoir lors de l'indépendance en 1960 et gouverne jusqu'en 1963, date à laquelle il est renversé par un soulèvement populaire.",
      naissance: '9 juin 1917, Madibou', deces: '5 mai 1972, Madrid',
      fonctions: "Premier Président de la République du Congo (1960-1963)",
      mandat: '15 août 1960 – 15 août 1963',
      parti: "Union Démocratique pour la Défense des Intérêts Africains (UDDIA)"
    },
    marien: {
      nom: 'Marien Ngouabi',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354053/l_histoire_de_Marien_Ngouabi___Congo_Brazzaville_1_jh19xx.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1777885730/marien_ngoubi_tnwcki.jpg',
      bio: "Marien Ngouabi est un officier militaire et homme d'État congolais qui prit le pouvoir en 1968 lors d'un coup d'État. Il fonda la République populaire du Congo et fut assassiné le 18 mars 1977.",
      naissance: '31 décembre 1938, Ombélé', deces: '18 mars 1977, Brazzaville',
      fonctions: 'Président de la République Populaire du Congo (1968–1977)',
      mandat: '31 décembre 1968 – 18 mars 1977',
      parti: 'Parti Congolais du Travail'
    },
    joachim: {
      nom: 'Joachim Yhombi-Opango',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354046/BOMOYI_1_-_Joachim_Yhombi-Opango_wkucyy.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1777886031/yhombi_opango_jyk2o4.jpg',
      bio: "Joachim Yhombi-Opango est un militaire et homme d'État congolais. Il assuma la présidence après l'assassinat de Marien Ngouabi jusqu'à son renversement en 1979.",
      naissance: '1939, Owando', deces: '17 novembre 2020',
      fonctions: 'Président de la République Populaire du Congo (1977–1979)',
      mandat: '5 avril 1977 – 5 février 1979',
      parti: 'Parti Congolais du Travail'
    },
    denis1: {
      nom: 'Denis Sassou Nguesso (1er mandat)',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354055/Documentaire___Le_pouvoir_et_la_vie_Denis_Sassou_Nguesso_1_1_p0nzt1.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1777886181/sassou_aoekfq.jpg',
      bio: "Denis Sassou Nguesso accède à la présidence en 1979. Durant son premier mandat, il dirige la République Populaire du Congo sous le régime marxiste jusqu'à la démocratisation de 1992.",
      naissance: '23 novembre 1943, Edou', deces: 'Vivant',
      fonctions: 'Président de la République (1979–1992 et 1997–présent)',
      mandat: '8 février 1979 – 31 août 1992',
      parti: 'Parti Congolais du Travail'
    },
    pascal: {
      nom: 'Pascal Lissouba',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354062/L_HISTOIRE_FASCINANTE_DU_PROFESSEUR_PASCAL_LISSOUBA___ITIN%C3%89RAIRE_D_UN_INTELLECTU_1_kave8c.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1776352610/Pascal-Lissouba_nas9lo.png',
      bio: "Pascal Lissouba est élu démocratiquement en 1992 et devient le premier président élu au suffrage universel lors de la transition démocratique. Son mandat prend fin lors de la guerre civile de 1997.",
      naissance: '15 novembre 1931, Tsinguidi', deces: '24 août 2020, Perpignan',
      fonctions: 'Président de la République du Congo (1992–1997)',
      mandat: '31 août 1992 – 25 octobre 1997',
      parti: 'Union Panafricaine pour la Démocratie Sociale'
    },
    denis2: {
      nom: 'Denis Sassou Nguesso (2ème mandat)',
      video: 'https://res.cloudinary.com/dcno88ooa/video/upload/v1776354040/CONGO__OYO__SASSOU-NGUESSO_GIVEN_HERO_S_WELCOME_IN_HOMETOWN_a3rc08.mp4',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1777886257/sassou_vieux_isvdjl.jpg',
      bio: "Après la guerre civile, Denis Sassou Nguesso reprend le pouvoir en 1997 et dirige le Congo jusqu'à ce jour. Il est réélu en 2002, 2009 et 2016.",
      naissance: '23 novembre 1943, Edou', deces: 'Vivant',
      fonctions: "Président de la République du Congo (1997–présent)",
      mandat: '25 octobre 1997 – présent',
      parti: 'Parti Congolais du Travail'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.president = this.data[id] || null;
    });
  }
}
