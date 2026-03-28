/* Theme Toggle - Dark Mode e Light Mode */

class ThemeToggle {
  constructor() {
    this.htmlElement = document.documentElement;
    this.toggleButton = document.getElementById('theme-toggle');
    this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  init() {
    // Carrega o tema salvo ou usa a preferência do sistema
    const savedTheme = this.getSavedTheme();
    const currentTheme = savedTheme || this.getSystemTheme();
    
    this.setTheme(currentTheme);
    this.setupToggleListener();
    this.setupSystemThemeListener();
  }

  getSavedTheme() {
    return localStorage.getItem('theme');
  }

  getSystemTheme() {
    return this.prefersDarkScheme.matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    this.htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleButton(theme);
  }

  toggleTheme() {
    const currentTheme = this.htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  updateToggleButton(theme) {
    if (this.toggleButton) {
      this.toggleButton.setAttribute('aria-label', `Mudar para ${theme === 'dark' ? 'light' : 'dark'} mode`);
      this.toggleButton.innerHTML = theme === 'dark' 
        ? '☀️' // Ícone do sol para indicar que pode mudar para light mode
        : '🌙'; // Ícone da lua para indicar que pode mudar para dark mode
    }
  }

  setupToggleListener() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }
  }

  setupSystemThemeListener() {
    // Responde às mudanças de preferência do sistema
    this.prefersDarkScheme.addEventListener('change', (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      // Só aplica a mudança do sistema se nenhum tema foi salvo
      if (!this.getSavedTheme()) {
        this.setTheme(newTheme);
      }
    });
  }
}

// Inicializa quando o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
  });
} else {
  new ThemeToggle();
}
