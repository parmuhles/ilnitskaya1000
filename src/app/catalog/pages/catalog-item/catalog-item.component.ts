import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog } from 'src/app/shared/interfaces/catalog.interface';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {
  id: number | null = null;

  catalog?: Catalog;

  catalogForm!: FormGroup;
  categories!: Categories[];
  constructor(
    public catalogServices: CatalogService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
    })
    this.getCategories();
    this.getData();
  }

  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      article: [null, [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.maxLength(100)]],
      producer: [null, [Validators.maxLength(100)]],
      category: [null, [Validators.required]],
      weight: [null, [Validators.maxLength(100)]],
      count: [null, [Validators.required, Validators.maxLength(100)]]
    }
    this.catalogForm = this.fb.group(controls);

    if (this.id) {
      try {
        this.catalog = await this.catalogServices.getCatalog(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.catalogForm.patchValue(this.catalog);
    } else {
      this.catalogForm.reset();
    }
  }
  async getCategories() {
    try {
      this.catalogServices.categories = await this.catalogServices.getCategories();
    } catch (err) {
      console.log(err);
    }
  }

  async save() {
    if (this.id) {
      const catalog = this.catalogForm.value;
      try {
        await this.catalogServices.putCatalog(this.id, catalog);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    } else {
      const catalog = this.catalogForm.value;
      try {
        const result = await this.catalogServices.postCatalog(catalog);
        this.router.navigate([this.router.url, result.id]);
      } catch (error) {
        console.log(error);

      }
    }
  }

  async delete () {
    try {
      await this.catalogServices.deleteCatalog(this.id);
      this.router.navigate(['catalog']);
    } catch (error){
      console.log(error);
    }
  }
  
}
