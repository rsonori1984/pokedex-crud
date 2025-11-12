import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from "../models/pokemon.model";

// export interface Pokemon {
//   name: string;
//   description?: string;
//   url?: string;
//   details?: {
//     id?: string | number;
//     height?: string | number;
//     weight?: string | number;
//     abilities?: string[];
//     types?: string[];
//   };
// }

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly localKey = 'pokemons-local';

  pokemons = signal<Pokemon[]>([]);
  selectedPokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  hasMore = signal(true);

  constructor(private http: HttpClient) {}

  /**Carrega lista (API + Local) */
  loadPokemons(offset = 0, limit = 30) {
    if (this.loading()) return;

    this.loading.set(true);
    const local = this.getLocalData();

    this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).subscribe({
      next: (res) => {
        const apiList: Pokemon[] = res.results.map((p: any) => ({
          name: p.name,
          url: p.url,
        }));

        const merged = offset === 0
  ? this.mergeWithLocal(apiList, local)
  : [...this.pokemons(), ...this.mergeWithLocal(apiList, local)]
      .filter((p, i, arr) => arr.findIndex(x => x.name === p.name) === i); // remove duplicados


        this.pokemons.set(merged);
        this.hasMore.set(!!res.next);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

loadPokemonDetail(name: string) {
  const local = this.pokemons().find((p) => p.name === name);
  if (local && local.url?.startsWith('local://')) {
    this.selectedPokemon.set({
      ...local,
      details: {
        id: '-',
        height: '-',
        weight: '-',
        types: ['Local'],
        abilities: [],
      }
    });
    return;
  }

  this.http.get<any>(`${this.apiUrl}/${name}`).subscribe((res) => {
    this.selectedPokemon.set({
      name: res.name,
      url: res.sprites?.front_default,
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

  /**CRUD local */
  addPokemon(pokemon: Pokemon) {
    const updated = [...this.pokemons(), { ...pokemon, url: `local://${pokemon.name}` }];
    this.pokemons.set(updated);
    this.saveLocalData(updated);
  }

  editPokemon(name: string, data: Partial<Pokemon>) {
    const updated = this.pokemons().map((p) =>
      p.name === name ? { ...p, ...data } : p
    );
    this.pokemons.set(updated);
    this.saveLocalData(updated);
  }

  deletePokemon(name: string) {
    const updated = this.pokemons().filter((p) => p.name !== name);
    this.pokemons.set(updated);
    this.saveLocalData(updated);
  }

  /**Limpa estado */
  clear() {
    this.pokemons.set([]);
    this.selectedPokemon.set(null);
  }

  /**Helpers locais */
  private getLocalData(): Pokemon[] {
    const raw = localStorage.getItem(this.localKey);
    return raw ? JSON.parse(raw) : [];
  }

  private saveLocalData(data: Pokemon[]) {
    const localOnly = data.filter((p) => p.url?.startsWith('local://') || !p.url);
    localStorage.setItem(this.localKey, JSON.stringify(localOnly));
  }

  private mergeWithLocal(apiList: Pokemon[], local: Pokemon[]): Pokemon[] {
    const localNames = local.map((p) => p.name);
    return [
      ...apiList.filter((p) => !localNames.includes(p.name)),
      ...local,
    ];
  }
}




// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({ providedIn: 'root' })
// export class PokemonService {
//   private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
//   pokemons = signal<any[]>([]);
//   selectedPokemon = signal<any | null>(null);
//   loading = signal(false);
//   hasMore = signal(true);

//   constructor(private http: HttpClient) {}

//   // Carrega os primeiros pokémons da API
//   // loadPokemons() {
//   //   this.http.get<any>(`${this.apiUrl}?limit=30`).subscribe(res => {
//   //     this.pokemons.set(res.results);
//   //   });
//   // }
//   loadPokemons(offset = 0, limit = 30) {
//     if (this.loading()) return; // evita múltiplas requisições simultâneas

//     this.loading.set(true);
//     this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`)
//       .subscribe({
//         next: res => {
//           const newList = [...this.pokemons(), ...res.results];
//           this.pokemons.set(newList);

//           // se retornou menos do que o limite, não há mais páginas
//           if (res.results.length < limit) {
//             this.hasMore.set(false);
//           }

//           this.loading.set(false);
//         },
//         error: () => this.loading.set(false)
//       });
//   }
//   // Carrega um Pokémon específico
//   loadPokemonDetail(name: string) {
//     this.http.get<any>(`${this.apiUrl}/${name}`).subscribe(res => {
//       this.selectedPokemon.set(res);
//     });
//   }

//   // CRUD local
//   addPokemon(pokemon: any) {
//     this.pokemons.update(list => [...list, pokemon]);
//   }

//   editPokemon(name: string, data: any) {
//     this.pokemons.update(list =>
//       list.map(p => (p.name === name ? { ...p, ...data } : p))
//     );
//   }

//   deletePokemon(name: string) {
//     this.pokemons.update(list => list.filter(p => p.name !== name));
//   }
// }
