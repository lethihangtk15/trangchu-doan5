import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent extends BaseComponent implements OnInit {
  list_brand: any;
  page: any;
  pageSize: any;
  totalItems:any;
  brand_id:any;
  menus1:any;

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this.list_brand = [];
    this.page = 1;
    this.pageSize = 5;
    this._route.params.subscribe(params => {
      this.brand_id = params['id'];
      this._api.post('/api/product/search-brand', {
        page: this.page,
        pageSize: this.pageSize,
        brand_id: this.brand_id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list_brand = res.data;
        this.totalItems = res.totalItems;
        }, err => { });
   });
   this._api.get('/api/brand/get-brand').takeUntil(this.unsubscribe).subscribe(res => {
    this.menus1 = res;
  });
  }

  loadPage(page) {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.post('/api/product/search-brand', {
        page: page,
        pageSize: this.pageSize,
        brand_id: id}).takeUntil(this.unsubscribe).subscribe(res => {
        this.list_brand = res.data;
        this.totalItems = res.totalItems;
        }, err => { });
   });
  }
  addToCart(it) {
    this._cart.addToCart(it);
    alert('Thêm thành công!');
  }
}
