import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  pokemons = signal<any[]>([]);
  selectedPokemon = signal<any | null>(null);
  loading = signal(false);
  hasMore = signal(true);

  constructor(private http: HttpClient) {}

  // Carrega os primeiros pokémons da API
  // loadPokemons() {
  //   this.http.get<any>(`${this.apiUrl}?limit=30`).subscribe(res => {
  //     this.pokemons.set(res.results);
  //   });
  // }
  loadPokemons(offset = 0, limit = 30) {
    if (this.loading()) return; // evita múltiplas requisições simultâneas

    this.loading.set(true);
    this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`)
      .subscribe({
        next: res => {
          const newList = [...this.pokemons(), ...res.results];
          this.pokemons.set(newList);

          // se retornou menos do que o limite, não há mais páginas
          if (res.results.length < limit) {
            this.hasMore.set(false);
          }

          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }
  // Carrega um Pokémon específico
  loadPokemonDetail(name: string) {
    this.http.get<any>(`${this.apiUrl}/${name}`).subscribe(res => {
      this.selectedPokemon.set(res);
    });
  }

  // CRUD local
  addPokemon(pokemon: any) {
    this.pokemons.update(list => [...list, pokemon]);
  }

  editPokemon(name: string, data: any) {
    this.pokemons.update(list =>
      list.map(p => (p.name === name ? { ...p, ...data } : p))
    );
  }

  deletePokemon(name: string) {
    this.pokemons.update(list => list.filter(p => p.name !== name));
  }
}
