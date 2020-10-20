import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { BaseComponent } from '../lib/base-component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  list_item:any;
  list_item_new:any;
  index:any;
  size:any;
  total:any;

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this.list_item=[];
    this.index=1;
    this.size=1;
    let elem = document.getElementsByClassName("script");
    for(var i = elem.length -1; 0 <= i; i--) {
      elem[i].remove();
    }
      this.loadScripts();
    Observable.combineLatest(
      this._api.get('/api/product/get-all/'+this.index+'/'+this.size),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_item = res[0];
    }, err => {});
    Observable.combineLatest(
      this._api.get('/api/product/get-new'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_item_new = res[0];
    }, err => {});

  }
  addToCart(it) {
    this._cart.addToCart(it);
    alert('Thêm thành công!');
  }
  loadPage(page) {
    Observable.combineLatest(
      this._api.get('/api/product/get-all/'+page+'/'+this.size),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_item = res[0];
    }, err => {});
  }
}

// export class ListComponent extends BaseComponent implements OnInit {
//   list: any;
//   page: any;
//   pageSize: any;
//   totalItems:any;
//   item_group_id:any;
//   constructor(injector: Injector) {
//     super(injector);
//   }
//   ngOnInit(): void {
//     this.list = [];
//     this.page = 1;
//     this.pageSize = 5;
//     this._route.params.subscribe(params => {
//       this.item_group_id = params['id'];
//       this._api.post('/api/sanpham/search', { page: this.page, pageSize: this.pageSize, item_group_id: this.item_group_id}).takeUntil(this.unsubscribe).subscribe(res => {
//         this.list = res.data;
//         this.totalItems = res.totalItems;
//         }, err => { });
//    });
//   }
//   loadPage(page) {
//     this._route.params.subscribe(params => {
//       let id = params['id'];
//       this._api.post('/api/sanpham/search', { page: page, pageSize: this.pageSize, item_group_id: id}).takeUntil(this.unsubscribe).subscribe(res => {
//         this.list = res.data;
//         this.totalItems = res.totalItems;
//         }, err => { });
//    });
//   }
//   addToCart(it) {
//     this._cart.addToCart(it);
//     alert('Thêm thành công!');
//   }

// }
