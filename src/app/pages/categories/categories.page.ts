import { Component, OnInit, ViewChild  } from '@angular/core';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from "rxjs/operators";
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

  vm$: Observable<CategoryListVM>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public translate: TranslateService,
    private controlService: ControlService) {
  }

  ngOnInit() : void {
    this.initVM();
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ionViewWillEnter() : void {
    this.content.scrollToTop();
  }

  private initVM() : void {
    this.vm$ = combineLatest([
      this.controlService.controls$,
      this.controlService.categories$
      ]).pipe(
      map( ([controls, categories]) => {
        controls = controls
        .filter( control => control.is_visible );
        let filtered_categories = controls.map(control => control.category );
        let categories_list = categories
          .filter( category => category.is_visible && !category.is_favorite && filtered_categories.indexOf(category.uuid) > -1)
          // TODO remove duplicates?
          //.filter((value, index, self) => self.indexOf(value) === index) // TODO remove duplicates
          //.filter((value, index, self) => index === self.findIndex((t) => ( t.name === value.name ))) // remove items with duplicate names
          .sort( (a, b) => ( a.order[0] - b.order[0] || a.name.localeCompare(b.name) ) );
        let categories_favs = categories
          .filter( category => category.is_visible && category.is_favorite && filtered_categories.indexOf(category.uuid) > -1)
          // TODO remove duplicates?
          //.filter((value, index, self) => self.indexOf(value) === index) // TODO remove duplicates
          //.filter((value, index, self) => index === self.findIndex((t) => ( t.name === value.name ))) // remove items with duplicate names
          .sort( (a, b) => ( a.order[1] - b.order[1] || a.name.localeCompare(b.name) ) );
          const vm: CategoryListVM = {
            categories: categories,
            categories_list: categories_list,
            categories_favs: categories_favs
          };
          return vm;
      }),
      takeUntil(this.destroy$)
    );
  }

}
