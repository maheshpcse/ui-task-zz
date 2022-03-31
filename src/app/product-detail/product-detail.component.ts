import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../api-services/products.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    selectedId: any = null;
    product: any = {};
    productSpinner: any = false;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public productsService: ProductsService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.productSpinner = true;
        this.route.params.subscribe(async (data: any) => {
            console.log('Get selected product data isss', data);
            if (data && Object.keys(data).length > 0) {
                this.selectedId = data.id ? data.id : null;
                this.getProductDetails();
            } else {
                this.toastr.errorToastr('Error while getting selected product data.');
                this.productSpinner = false;
            }
        }, (error) => {
            this.toastr.errorToastr('Network failed. Please try again.');
            this.productSpinner = false;
        });
    }

    getProductDetails() {
        this.productSpinner = true;
        this.productsService.getProductDetailsById(Number(this.selectedId)).subscribe(async (response: any) => {
            console.log('Get selected product details response isss', response);
            if (response && Object.keys(response).length > 0) {
                this.product = response;
            } else {
                this.toastr.errorToastr('Error while getting selected product details');
            }
            this.productSpinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
            this.productSpinner = false;
        });
    }

    getData() {
        if (this.product && Object.keys(this.product).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    addProductDataToCart() {
        const productPayload = {
            userId: 1,
            date: moment().format('YYYY-MM-DD'),
            products: [
                {
                    productId: Number(this.selectedId),
                    quantity: 1
                }
            ]
        };
        console.log('Post payload to add product to cart data isss', productPayload);

        this.productsService.addProductToCart(JSON.stringify(productPayload)).subscribe(async (response: any) => {
            console.log('Get add product to cart data response isss', response);
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
        });
    }

}
