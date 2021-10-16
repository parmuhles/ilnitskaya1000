import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Catalog } from 'src/app/shared/interfaces/catalog.interface';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit {

  catalogs!: Catalog[];
  filters = [{ id: 0, selector: "category" }, { id: 0, selector: "count" }];
  counts = [{ id: 0, name: "Количество на складе" }, { id: 1, name: "Есть на складе" }, { id: 2, name: "Нет на складе" }];
  constructor(
    public catalogService: CatalogService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.getData();
  }

  async getData() {
    try {
      this.catalogService.catalogs = (await this.catalogService.getCatalogs()) || [];
      this.catalogs = this.catalogService.catalogs;
    } catch (error) {
      console.log(error);
    }
  }
  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, 'item', id])
    } else {
      this.router.navigate([this.router.url, 'item'])
    }

  }
  getCategoriesCatalog(id: any) {

    return this.catalogService.categories.find(item => item.id == id)?.name;
  }
  async getCategories() {
    try {
      this.catalogService.categories = await this.catalogService.getCategories();
    } catch (err) {
      console.log(err);
    }
  }

  count(catalog: Catalog, type: string) {
    if (type == 'plus') {
      catalog.count++;
      this.catalogService.putCatalog(catalog.id, catalog);
    } else {
      catalog.count--;
      this.catalogService.putCatalog(catalog.id, catalog)
    }
  }
  sortData(idSort: string) {
    let id = 0;
    id = parseInt(idSort);
    if (id == 0) {
      this.catalogs = this.catalogs.sort((a, b) => a.price - b.price);
    } else if (id == 1) {
      this.catalogs = this.catalogs.sort((a, b) => b.price - a.price);
    } else if (id == 2) {
      this.catalogs = this.catalogs.sort((a, b) => a.count - b.count);
    } else if (id == 3) {
      this.catalogs = this.catalogs.sort((a, b) => b.count - a.count);
    }
  }
  filter(filterId: string, selector: string) {
    this.catalogs = this.catalogService.catalogs;
    let id = 0;
    if (filterId)
      id = parseInt(filterId);
    this.filters.find(item => item.selector == selector ? item.id = id : false);
    console.log(this.filters);
    for (let fil of this.filters) {
      if (fil.id != 0) {
        if (fil.selector == "category") {
          this.catalogs = this.catalogs.filter(item => (Number)(item.category) == fil.id);
          console.log(this.catalogs);
        }
        else if (fil.selector == "count") {
          this.catalogs = this.catalogs.filter(item => fil.id == 1 ? item.count > 0 : item.count == 0)
          console.log(this.catalogs);
        }
      }
    }
  }
}
