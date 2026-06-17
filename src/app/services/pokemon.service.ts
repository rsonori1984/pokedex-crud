import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonSearchItem } from '../models/pokemon.model';
import { STORAGE_KEYS } from '../constants/storage.constants';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  showFavoritesOnly = signal(false);
  pokemons = signal<Pokemon[]>([]);
  selectedPokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  hasMore = signal(true);
  pokemonNames = signal<PokemonSearchItem[]>([]);
  favorites = signal<string[]>([]);
  favoritePokemons = signal<Pokemon[]>([]);

  filteredPokemons = computed(() => {
    if (this.showFavoritesOnly()) {
      return this.favoritePokemons();
    }

    return this.pokemons();
  });

  constructor(private http: HttpClient) {
    this.loadFavorites();
    this.loadFavoritePokemons();
  }

  loadPokemonNames() {
    if (this.pokemonNames().length > 0) {
      return;
    }

    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=100000').subscribe((res) => {
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
          },
        }));

        const merged =
          offset === 0
            ? apiList
            : [...this.pokemons(), ...apiList].filter(
                (p, i, arr) => arr.findIndex((x) => x.name === p.name) === i,
              ); // remove duplicados

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

  loadFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);

      if (saved) {
        this.favorites.set(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    }
  }

  toggleFavorite(name: string) {
    const favorites = this.favorites();

    const updated = favorites.includes(name)
      ? favorites.filter((f) => f !== name)
      : [...favorites, name];

    this.favorites.set(updated);

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));

    this.favoritePokemons.set([]);
    this.loadFavoritePokemons();
  }

  isFavorite(name: string): boolean {
    return this.favorites().includes(name);
  }

  loadFavoritePokemons() {
    const favorites = this.favorites();

    if (favorites.length === 0) {
      this.favoritePokemons.set([]);
      return;
    }

    favorites.forEach((name) => {
      this.http.get<any>(`${this.apiUrl}/${name}`).subscribe((res) => {
        const pokemon: Pokemon = {
          name: res.name,
          url: res.sprites?.front_default,
          details: {
            id: res.id,
          },
        };

        this.favoritePokemons.update((list) => {
          if (list.some((p) => p.name === pokemon.name)) {
            return list;
          }

          return [...list, pokemon];
        });
      });
    });
  }
}
