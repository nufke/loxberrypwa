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

  public darkTheme: boolean = false;
  public language: string;

  constructor(
    private storageService: StorageService,
    public translate: TranslateService )
  {
    this.storageService.getSettings().subscribe( settings =>
    {
      if (settings) {
        this.darkTheme = settings.appDarkTheme;
        document.body.classList.toggle('dark', this.darkTheme);

        this.language = settings.appLanguage;
        this.translate.use(this.language);
      }
    });
  }

  ngOnInit() {
  }

  onToggleDarkTheme() {
    document.body.classList.toggle('dark', this.darkTheme);
    console.log("darkTheme: ", this.darkTheme);
    this.storageService.store( { appDarkTheme: this.darkTheme } );
  }

  setLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
    this.storageService.store( { appLanguage: this.language } );
  }

}
