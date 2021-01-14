import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AlertifyService } from '../services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category/category';


//declare let alertify:any; //alertify nesnesini bulup onu tanıyor.

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  
  constructor(
    private alertifyService:AlertifyService,
    private productService:ProductService,
    private activatedRoute:ActivatedRoute
    ) { }
  
  title = "Ürün Listesi"
  filterText = ""
  products : Product[] = []; 
 

  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
      this.productService.getProducts(params["categoryId"]).subscribe(data=>{
        this.products = data
      });

    })


    
    /*this.http.get<Product[]>(this.path).subscribe((data:Product[])=>{
      this.products = data;
    }); */
  }

  addToCart(product:Product){
    this.alertifyService.success(product.name+" added")
    
  }

}
