import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api-services/products.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    categoriesList: any = [];
    selectedCatIndex: any = null;
    selectedCatName: any = '';
    productsList: any = [];
    categorySpinner: any = false;
    productSpinner: any = false;

    constructor(
        public productsService: ProductsService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.getAllCategoriesList();
        this.getAllProductsList();
    }

    getAllCategoriesList() {
        this.categorySpinner = true;
        this.productsService.getAllCategoriesData().subscribe(async (response: any) => {
            console.log('Get all categories list response isss', response);
            if (response) {
                this.categoriesList = response;
            } else {
                this.toastr.errorToastr('Error while getting categories list');
            }
            this.categorySpinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
            this.categorySpinner = false;
        });
    }

    getAllProductsList() {
        this.productSpinner = true;
        this.productsService.getAllProductsData().subscribe(async (response: any) => {
            console.log('Get all products list response isss', response);
            if (response) {
                this.productsList = response;
            } else {
                this.toastr.errorToastr('Error while getting all products list');
            }
            this.productSpinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
            this.productSpinner = false;
        });
    }

    getProductsListByCategory(item?: any, id?: any) {
        console.log('Selected item and id isss', item, id);
        this.selectedCatName = item;
        this.selectedCatIndex = id;
        this.productSpinner = true;
        this.productsService.getProductsDataByCaterogy(item).subscribe(async (response: any) => {
            console.log('Get category wise products list response isss', response);
            if (response) {
                this.productsList = response;
            } else {
                this.toastr.errorToastr('Error while getting category wise products list');
            }
            this.productSpinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
            this.productSpinner = false;
        });
    }

}
