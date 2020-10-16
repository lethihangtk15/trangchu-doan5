import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent extends BaseComponent implements OnInit {
  item:any;
  list_item_related:any;
  category_id:any;

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {


    this.item = {};
    this.list_item_related=[];
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/product/get-by-id/'+id).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
        this.item = res;
        // console.log(this.item.category_id)
        //console.log("api/product/get-product-related/" + id + "/" + this.item.category_id)
        // this._api.get("api/product/get-product-related/" + id + "/" + this.item.category_id).subscribe((data) => {
          // this.list_item_related = data;
        //   console.log(this.list_item_related)
        // })
      })


      setTimeout(() => {
        this.loadScripts();
      })
    })
  }

  addToCart(it) {
    this._cart.addToCart(it);
    alert('Thêm thành công!');
  }
}

