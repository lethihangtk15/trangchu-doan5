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

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    let elem = document.getElementsByClassName("script");
    for(var i = elem.length -1; 0 <= i; i--) {
      elem[i].remove();
    }
      this.loadScripts();
    Observable.combineLatest(
      this._api.get('/api/product/get-all'),
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
}
