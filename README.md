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
│   │       ├───theme-toggle
│   │       └───weather-component
│   └───services
├───assets
│   └───img
└───styles
```

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

Execute o projeto:

```bash
ng serve
```

Acesse:

```text
http://localhost:4200
```

---

## Build

```bash
ng build
```

Os arquivos gerados ficarão em:

```text
dist/pokedex-crud
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