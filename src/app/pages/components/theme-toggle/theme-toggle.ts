import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  standalone: true,
})
export class ThemeToggle {
constructor(public themeService: ThemeService) {}

toggleTheme(){
  this.themeService.toggleTheme();
}
}
