import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(
        public http: HttpClient
    ) { }

    getAllCategoriesData() {
        return this.http.get(`https://fakestoreapi.com/products/categories`);
    }

    getAllProductsData() {
        return this.http.get(`https://fakestoreapi.com/products`);
    }

    getProductsDataByCaterogy(category: any) {
        return this.http.get(`https://fakestoreapi.com/products/category/${category}`);
    }

    getProductDetailsById(id: any) {
        return this.http.get(`https://fakestoreapi.com/products/${id}`);
    }

    getAllCartData() {
        return this.http.get(`https://fakestoreapi.com/carts`);
    }

    addProductToCart(data: any) {
        return this.http.post(`https://fakestoreapi.com/carts`, data);
    }
}
