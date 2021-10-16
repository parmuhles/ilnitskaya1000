import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatalogItemComponent } from 'src/app/catalog/pages/catalog-item/catalog-item.component';
import { Catalog } from '../interfaces/catalog.interface';
import { Categories } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public categories!: Categories[];
  public catalogs!: Catalog[];
  constructor(private http: HttpClient) {}

  getCatalogs(): Promise<Catalog[]>{
    return this.http
    .get<Catalog[]>(`${environment.apiUrl}/catalog`)
    .toPromise();
  }

  postCatalog(data:Catalog): Promise<Catalog>{
    return this.http
    .post<Catalog>(`${environment.apiUrl}/catalog`, data)
    .toPromise();
  }

  getCatalog(id: number): Promise<Catalog>{
    return this.http
    .get<Catalog>(`${environment.apiUrl}/catalog/${id}`)
    .toPromise();
  }

  putCatalog(id: number, data:Catalog): Promise<Catalog>{
    return this.http
    .put<Catalog>(`${environment.apiUrl}/catalog/${id}`, data)
    .toPromise();
  }

  deleteCatalog(id: number| any): Promise<Catalog>{
    return this.http
    .delete<Catalog>(`${environment.apiUrl}/catalog/${id}`)
    .toPromise();
  }
  getCategories(): Promise<Categories[]>{
    return this.http
    .get<Categories[]>(`${environment.apiUrl}/categories`)
    .toPromise();
  }
  
}
