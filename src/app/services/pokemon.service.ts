import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonSearchItem } from "../models/pokemon.model";

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  pokemons = signal<Pokemon[]>([]);
  selectedPokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  hasMore = signal(true);
  pokemonNames = signal<PokemonSearchItem[]>([]);

  constructor(private http: HttpClient) {}

loadPokemonNames() {

  if (this.pokemonNames().length > 0) {
    return;
  }

  this.http
    .get<any>('https://pokeapi.co/api/v2/pokemon?limit=100000')
    .subscribe(res => {
      this.pokemonNames.set(res.results);
    });
}

  /**Carrega lista (API + Local) */
  loadPokemons(offset = 0, limit = 30) {
    if (this.loading()) return;

    this.loading.set(true);
    this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).subscribe({
      next: (res) => {
        const apiList: Pokemon[] = res.results.map((p: any) => ({
          name: p.name,
          url: p.url,
          details: {
            id: p.url.split('/').slice(-2, -1)[0],
          }
        }));

        const merged = offset === 0
        ? apiList
        : [...this.pokemons(), ...apiList]
        .filter((p, i, arr) => arr.findIndex(x => x.name === p.name) === i); // remove duplicados


        this.pokemons.set(merged);
        this.hasMore.set(!!res.next);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

loadPokemonDetail(name: string) {
  this.http.get<any>(`${this.apiUrl}/${name}`).subscribe((res) => {
    this.selectedPokemon.set({
      name: res.name,
      url: res.sprites?.other.home.front_default,
      details: {
        id: res.id,
        height: res.height,
        weight: res.weight,
        types: res.types.map((t: any) => t.type.name),
        abilities: res.abilities.map((a: any) => a.ability.name),
      },
    });
  });
}

  /**Limpa estado */
  clear() {
    this.pokemons.set([]);
    this.selectedPokemon.set(null);
  }
}