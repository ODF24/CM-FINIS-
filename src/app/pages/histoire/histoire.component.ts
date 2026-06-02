import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface President {
  id: string;
  num: number;
  nom: string;
  annees: string;
  img: string;
}

@Component({
  selector: 'app-histoire',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './histoire.component.html',
  styleUrls: ['./histoire.component.css']
})
export class HistoireComponent implements AfterViewInit, OnInit {
  currentSlide = 0;

  presidents: President[] = [
    { id: 'fulbert', num: 1, nom: 'FULBERT YOULOU', annees: 'Président · 1960 – 1963', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/092f815b-9d32-49e1-aea0-2ddf8d909b80_e2iuxj.png' },
    { id: 'alphonse', num: 2, nom: 'ALPHONSE MASSAMBA-DÉBAT', annees: 'Président · 1963 – 1968', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353115/Portrait_d_homme_%C3%A9l%C3%A9gant_et_calme_hnzrza.png' },
    { id: 'marien', num: 3, nom: 'MARIEN NGOUABI', annees: 'Président · 1968 – 1977', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/97a1750b-1165-482e-adc8-898796e3eab2_hprwi4.png' },
    { id: 'joachim', num: 4, nom: 'JOACHIM YHOMBI-OPANGO', annees: 'Président · 1977 – 1979', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/2d09d06d-34c2-4bb7-a548-954c1b47159e_lm3uen.png' },
    { id: 'denis1', num: 5, nom: 'DENIS SASSOU NGUESSO', annees: 'Président · 1979 – 1992', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/v1777886809/Sassou_j_jwgl50.png' },
    { id: 'pascal', num: 6, nom: 'PASCAL LISSOUBA', annees: 'Président · 1992 – 1997', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776355197/Capture_d_%C3%A9cran_2026-04-16_165913_ymiidm.png' },
    { id: 'denis2', num: 7, nom: 'DENIS SASSOU NGUESSO', annees: 'Président · 1997 – présent', img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/264d8761-363c-4d23-b602-208dba71681e_byjdjw.png' }
  ];

  depts = [
    { id: 'likouala', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226033/likouala_bxfiyr.png', name: 'Likouala', desc: 'Vaste région nord-est, jungle équatoriale et zones marécageuses immenses.', style: 'top:0%;left:70%;width:25%;' },
    { id: 'sangha', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226035/Sangha_l2sr51.png', name: 'Sangha', desc: 'Forêts équatoriales au nord-ouest, grande biodiversité animale et végétale.', style: 'top:9%;left:32%;width:45%;' },
    { id: 'cuvette_ouest', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226033/cuvette_Ouest_idmtnx.png', name: 'Cuvette-Ouest', desc: 'Plaines forestières traversées par les affluents du fleuve Congo.', style: 'top:21%;left:39%;width:18%;' },
    { id: 'cuvette', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226033/cuvette_pgi49w.png', name: 'Cuvette', desc: 'Cœur du pays, dominé par le fleuve Congo et ses bras secondaires.', style: 'top:30.6%;left:48%;width:35%;' },
    { id: 'plateaux', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226034/plateaux_pmhjpf.png', name: 'Plateaux', desc: 'Hauts plateaux agricoles, carrefour entre le nord et le sud du pays.', style: 'top:46.8%;left:40%;width:35%;' },
    { id: 'lekoumou', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226033/lekoumou_opjeof.png', name: 'Lékoumou', desc: 'Zone de transition entre savanes et forêts du centre-sud.', style: 'top:57%;left:24%;width:20%;' },
    { id: 'niari', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775315024/8-niari_zqbiyl.png', name: 'Niari', desc: 'Riche en ressources minières, grand pôle agricole du sud-ouest.', style: 'top:21%;left:-53%;width:150%;' },
    { id: 'bouenza', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226033/Bouenza_lewgdu.png', name: 'Bouenza', desc: 'Région fertile du sud, connue pour ses chutes et ses cultures vivrières.', style: 'top:72%;left:26%;width:20%;' },
    { id: 'pool', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226034/pool_vg7nu6.png', name: 'Pool', desc: 'Département autour de Brazzaville, cœur politique et administratif.', style: 'top:63.9%;left:40%;width:28%;' },
    { id: 'kouilou', src: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1775226033/Kouilou_nu1zan.png', name: 'Kouilou', desc: 'Accès à l\'Atlantique. Pointe-Noire, poumon économique pétrolier du Congo.', style: 'top:421px;left:11%;width:20%;' }
  ];

  tooltipVisible = false;
  tooltipName = '';
  tooltipDesc = '';
  tooltipX = 0;
  tooltipY = 0;
  activeDept: string | null = null;

  get dots(): number[] {
    return Array.from({ length: 4 }, (_, i) => i);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initParticles();
    this.initScrollObserver();
    this.initMapAutoCycle();
  }

  showTooltip(dept: any, event: MouseEvent): void {
    this.tooltipName = dept.name;
    this.tooltipDesc = dept.desc;
    this.tooltipVisible = true;
    this.moveTooltip(event);
  }

  hideTooltip(dept: any): void {
    this.tooltipVisible = false;
    if (this.activeDept !== dept.id) {
      // not active, keep style managed by [class.active]
    }
  }

  moveTooltip(event: MouseEvent): void {
    const wrap = document.getElementById('mapOuter');
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    let x = event.clientX - r.left + 16;
    let y = event.clientY - r.top - 16;
    if (x + 196 > r.width) x = x - 212;
    if (y < 0) y = 8;
    this.tooltipX = x;
    this.tooltipY = y;
  }

  toggleDept(id: string): void {
    this.activeDept = this.activeDept === id ? null : id;
  }

  isDeptActive(id: string): boolean {
    return this.activeDept === id;
  }

  slide(dir: number): void {
    const grid = document.getElementById('presidentsGrid') as HTMLElement;
    const cards = document.querySelectorAll('.president-card');
    if (!cards.length) return;
    const cardW = (cards[0] as HTMLElement).offsetWidth + 24;
    const visible = Math.floor(grid.offsetWidth / cardW) || 1;
    const max = Math.ceil(cards.length / visible) - 1;
    const next = Math.min(Math.max(this.currentSlide + dir, 0), max);
    grid.scrollTo({ left: next * visible * cardW, behavior: 'smooth' });
    this.currentSlide = next;
  }

  goTo(idx: number): void {
    const grid = document.getElementById('presidentsGrid') as HTMLElement;
    const cards = document.querySelectorAll('.president-card');
    if (!cards.length) return;
    const cardW = (cards[0] as HTMLElement).offsetWidth + 24;
    const visible = Math.floor(grid.offsetWidth / cardW) || 1;
    grid.scrollTo({ left: idx * visible * cardW, behavior: 'smooth' });
    this.currentSlide = idx;
  }

  scrollToBatisseurs(): void {
    document.getElementById('batisseurs')?.scrollIntoView({ behavior: 'smooth' });
  }

  initParticles(): void {
    const cv = document.getElementById('particles') as HTMLCanvasElement;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;
    let W = cv.width = cv.offsetWidth, H = cv.height = cv.offsetHeight;
    window.addEventListener('resize', () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; });
    const pts: any[] = [];
    for (let i = 0; i < 70; i++) pts.push({ x: Math.random(), y: Math.random(), vx: (Math.random()-.5)*.00014, vy: -(Math.random()*.00018+.00007), r: Math.random()*2+.4, a: Math.random()*.48+.08 });
    const tick = () => {
      cx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < 0) p.y = 1; if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        cx.beginPath(); cx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
        cx.fillStyle = `rgba(201,150,12,${p.a})`; cx.fill();
      });
      requestAnimationFrame(tick);
    };
    tick();
  }

  initScrollObserver(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }

  initMapAutoCycle(): void {
    const imgs = Array.from(document.querySelectorAll('.dept-img'));
    let ci = 0;
    setInterval(() => {
      imgs.forEach(i => i.classList.remove('flash'));
      const cur = imgs[ci];
      if (cur) { cur.classList.remove('flash'); void (cur as HTMLElement).offsetWidth; cur.classList.add('flash'); }
      ci = (ci+1) % imgs.length;
    }, 2000);
  }
}
