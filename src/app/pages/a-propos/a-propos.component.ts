import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.css']
})
export class AProposComponent implements OnInit {
  renseignementForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Initialisation du formulaire avec validations de base
  initForm(): void {
    this.renseignementForm = this.fb.group({
      nomComplet: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      statut: ['', [Validators.required]],
      sujet: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Gestion de la soumission du formulaire
  onSubmit(): void {
    if (this.renseignementForm.valid) {
      console.log('Données envoyées avec succès :', this.renseignementForm.value);
      alert('Votre demande de renseignement a bien été envoyée !');
      this.renseignementForm.reset();
    } else {
      this.renseignementForm.markAllAsTouched();
    }
  }
}