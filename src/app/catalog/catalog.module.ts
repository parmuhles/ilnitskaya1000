import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogListComponent } from './pages/catalog-list/catalog-list.component';
import { CatalogItemComponent } from './pages/catalog-item/catalog-item.component';
import { CatalogLayoutComponent } from './shared/components/catalog-layout/catalog-layout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogListComponent,
    CatalogItemComponent,
    CatalogLayoutComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ReactiveFormsModule
  ]
})
export class CatalogModule { }
