import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  @Input() editMode = false;
  @Input() currentName = '';
  
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PokemonService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    if (this.editMode && this.currentName) {
      const pokemon = this.service.pokemons().find(p => p.name === this.currentName);
      if (pokemon) this.form.patchValue(pokemon);
    }
  }

  onSubmit() {
    const data = this.form.value;
    if (this.editMode) {
      this.service.editPokemon(this.currentName, data);
    } else {
      this.service.addPokemon(data);
    }
    this.router.navigate(['/']);
  }
}