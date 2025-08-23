export type Lang = 'en-us' | 'he-il';

class LanguageService {
  private _lang: Lang = 'he-il';
  private listeners = new Set<() => void>();

  get selectedLanguage() { return this._lang; }
  setLanguage(lang: Lang) {
    if (lang !== this._lang) {
      this._lang = lang;
      this.listeners.forEach(l => l());
    }
  }

  subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}
export const language = new LanguageService();