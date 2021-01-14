import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Product } from '../product/product'
import { Observable, throwError} from 'rxjs';
import {tap,catchError} from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http:HttpClient) { }
  path = "http://localhost:3000/products"

  getProducts(categoryId: number):Observable<Product[]>{

    let newPath = this.path;
    if(categoryId){
      newPath += "?categoryId="+categoryId
    }

    
    return this.http
      .get<Product[]>(newPath).pipe(
        tap(data=>console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  addProduct(product:Product):Observable<Product>{
    const httpOption={
      headers:new HttpHeaders({
        'Content-Type':'appllication/json',
        'Authorization':'Token'
      })
    }
    return this.http.post<Product>(this.path,product).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage =''
    if(error.error){
       errorMessage = `Bir hata oluştu ${error.error.errorMessage}`

    }else{
      errorMessage = 'Sistemsel bir hata'
    }
    return throwError(errorMessage);
  }
   
  
}
