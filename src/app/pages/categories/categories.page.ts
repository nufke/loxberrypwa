import { Component, OnInit, ViewChild  } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CategoryListVM } from '../../interfaces/view.model';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage
  implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public vm$: Observable<CategoryListVM>;

  constructor(
    public translate: TranslateService,
    private controlService: ControlService)
  {
    this.initVM();
  }

  private initVM() : void {
    this.vm$ =  combineLatest([
      this.controlService.controls$,
      this.controlService.categories$
      ]).pipe(
      map( ([controls, categories]) => {
        controls = controls
        .filter( control => control.is_visible );
        let filtered_categories = controls.map(control => control.category );
        let categories_ex_fav = categories
          .filter( category => category.is_visible && !category.is_favorite && filtered_categories.indexOf(category.uuid) > -1)
          // TODO remove duplicates?
          //.filter((value, index, self) => self.indexOf(value) === index) // TODO remove duplicates
          //.filter((value, index, self) => index === self.findIndex((t) => ( t.name === value.name ))) // remove items with duplicate names
          .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) );
        let fav_categories = categories
          .filter( category => category.is_visible && category.is_favorite && filtered_categories.indexOf(category.uuid) > -1)
          // TODO remove duplicates?
          //.filter((value, index, self) => self.indexOf(value) === index) // TODO remove duplicates
          //.filter((value, index, self) => index === self.findIndex((t) => ( t.name === value.name ))) // remove items with duplicate names
          .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) );
          const vm: CategoryListVM = {
            categories: categories,
            categories_ex_fav: categories_ex_fav,
            fav_categories: fav_categories
          };
          return vm;
      })
    );
  }

  ngOnInit() : void {
  }

  ionViewWillEnter() : void {
    this.content.scrollToTop();
  }
}
