import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  Pages = [
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'star-sharp'
    },
    {
      title: 'Rooms',
      url: '/rooms',
      icon: 'grid-sharp'
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: 'list-sharp'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];
  
  public darkTheme: boolean = false; 

  constructor()
  {
  }

  ngOnInit() {
  }
  
  onToggleDarkTheme() {
    document.body.classList.toggle('dark', this.darkTheme);
  }

}
