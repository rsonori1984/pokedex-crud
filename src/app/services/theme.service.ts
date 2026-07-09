import { Injectable } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private primeng: PrimeNG) {}

  toggleTheme() {
    document.body.classList.toggle('dark-theme');

    const isDark = document.body.classList.contains('dark-theme');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    this.primeng.ripple.set(true);
  }

  loadTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
}
