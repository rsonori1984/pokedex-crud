import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { RouterLink } from "@angular/router";
import { PokemonSearch } from "../pokemon-search/pokemon-search";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule,ThemeToggle, RouterLink, PokemonSearch],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
