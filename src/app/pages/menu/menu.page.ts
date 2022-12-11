import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  Pages = [
    {
      title: 'favorites',
      url: '/favorites',
      icon: 'star-sharp'
    },
    {
      title: 'rooms',
      url: '/room',
      icon: 'grid-sharp'
    },
    {
      title: 'categories',
      url: '/category',
      icon: 'list-sharp'
    },
    {
      title: 'settings',
      url: '/settings',
      icon: 'settings-outline'
    },
    {
      title: 'about',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];

  public darkTheme: boolean = false;

  constructor(
    private storageService: StorageService )
  {
    this.storageService.getSettings().subscribe( settings =>
    {
      if (settings) {
        this.darkTheme = settings.appDarkTheme;
        document.body.classList.toggle('dark', this.darkTheme);
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

}
