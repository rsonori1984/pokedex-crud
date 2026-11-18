# Pokédex Angular

Uma Pokédex moderna desenvolvida com Angular 20, consumindo a PokeAPI e exibindo informações detalhadas dos Pokémon em uma interface responsiva e intuitiva.

![Pokédex](./src/assets/img/logoPkDx.svg)

# Pokédex Angular

Uma Pokédex moderna construída com Angular 20, PrimeNG e PokeAPI.

## Demo

Deploy: https://pokedex-crud-v4t3.vercel.app/

## Funcionalidades

### Pokémon

* Listagem de Pokémon com Infinite Scroll
* Busca global utilizando AutoComplete
* Página de detalhes do Pokémon
* Exibição de tipos, habilidades, altura e peso
* Navegação entre listagem e detalhes

### Favoritos

* Adicionar e remover favoritos
* Persistência utilizando LocalStorage
* Filtro para exibir apenas favoritos
* Componente reutilizável de favorito

### Interface

* Tema claro/escuro
* Botão "Back to Top"
* Layout responsivo
* Componentes PrimeNG
* Loading states

### Clima

* Geolocalização do usuário
* Exibição da temperatura atual
* Temperaturas máxima e mínima do dia
* Descrição das condições climáticas
* Tratamento para negação de permissão de localização

---

## Tecnologias

* Angular 20
* Native Federation (microfrontends)
* TypeScript
* PrimeNG
* RxJS
* Signals
* PokeAPI
* Open-Meteo API
* Bootstrap
* Vercel

---

## Estrutura do Projeto

```text
src
├───app
│   ├───constants
│   ├───models
│   ├───pages
│   │   └───components
│   │       ├───back-to-top
│   │       ├───detail
│   │       ├───favorite-toggle
│   │       ├───header
│   │       ├───list
│   │       ├───pokemon-search
│   │       └───theme-toggle
│   └───services
├───assets
│   └───img
└───styles

projects
└───mfe-weather          # microfrontend (remote): widget de clima
    └───src/app
        ├───services
        └───weather-component
```

---

## Arquitetura de microfrontends

O projeto usa [Native Federation](https://github.com/angular-architects/module-federation-plugin/tree/main/libs/native-federation) (compatível com o builder esbuild do Angular 20).

| Projeto | Papel | Porta | O que faz |
| --- | --- | --- | --- |
| `pokedex-crud` | Host | 4200 | Pokédex (lista, detalhe, busca, favoritos, tema) |
| `mfe-weather` | Remote | 4201 | Widget de clima e relógio (`WeatherComponent`) |

Como funciona:

* O remote expõe o `WeatherComponent` em `projects/mfe-weather/federation.config.js` (`./WeatherComponent`).
* O host descobre o endereço do remote em runtime, pelo arquivo `public/federation.manifest.json`, e carrega o componente com `loadRemoteModule` + `NgComponentOutlet` (veja `src/app/app.ts`).
* Se o remote estiver fora do ar, a Pokédex continua funcionando normalmente, apenas sem o widget de clima.
* Dependências do Angular são compartilhadas como singleton entre host e remote.

Contrato entre host e remote: o host precisa fornecer `provideHttpClient()`, pois o `WeatherService` usa o `HttpClient` do host quando carregado como microfrontend.

### Deploy

O remote é um deploy independente. Em produção, aponte o manifesto do host para a URL pública do remote:

```json
{
  "mfe-weather": "https://SEU-DEPLOY-DO-CLIMA/remoteEntry.json"
}
```

Sem isso, o host em produção não encontra o remote e exibe a Pokédex sem o widget de clima.

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/rsonori1984/pokedex-crud.git
```

Entre na pasta:

```bash
cd pokedex-crud
```

Instale as dependências:

```bash
npm install
```

Execute o host e o microfrontend de clima juntos:

```bash
npm run start:all
```

Acesse:

```text
http://localhost:4200
```

Também é possível subir cada um separadamente:

```bash
npm run start:host      # Pokédex (host)  -> http://localhost:4200
npm run start:weather   # Clima (remote)  -> http://localhost:4201
```

---

## Build

```bash
npm run build:all
```

Os arquivos gerados ficarão em:

```text
dist/pokedex-crud   # host
dist/mfe-weather    # remote (inclui remoteEntry.json)
```

---

## Testes

Executar testes:

```bash
npm test
```

Executar em modo watch:

```bash
npm run test:watch
```

Gerar cobertura:

```bash
npm run test:coverage
```

---

## APIs Utilizadas

### PokeAPI

https://pokeapi.co/

Fonte de dados dos Pokémon.

### Open-Meteo

https://open-meteo.com/

Fonte de dados meteorológicos utilizada pelo widget de clima.

---

## Melhorias Futuras

* Testes unitários adicionais
* Melhorias de responsividade
* Página dedicada de favoritos
* Filtros por tipo
* PWA
* Otimizações de performance

---

## 👨‍💻 Autor

Rodrigo Onori
📫 https://www.linkedin.com/in/rodrigo-onori/

🎸 “Treine forte, capture todos e nunca pare de evoluir.”