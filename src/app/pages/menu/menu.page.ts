import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  Pages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home-outline'
    },
    {
      title: 'Rooms',
      url: '/room',
      icon: 'grid-sharp'
    },
    {
      title: 'Categories',
      url: '/category',
      icon: 'list-sharp'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings-outline'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];

  darkTheme: boolean = false;
  language: string;

  constructor(
    private storageService: StorageService,
    public translate: TranslateService )
  {
    this.storageService.settings$.subscribe( settings =>
    {
      if (settings && settings.app) {
        this.darkTheme = settings.app.dark_theme;
        document.body.classList.toggle('dark', this.darkTheme);

        this.language = settings.app.language;
        this.translate.use(this.language);
      }
    });
  }

  ngOnInit() {
  }

  onToggleDarkTheme() {
    document.body.classList.toggle('dark', this.darkTheme);
    this.saveMenuSettings();
  }

  setLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
    this.saveMenuSettings();
  }

  private saveMenuSettings() {
    this.storageService.saveSettings(
      {
        app: {
          dark_theme: this.darkTheme,
          language: this.language
        }
      });
  }
}
