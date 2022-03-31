import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../api-services/products.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    cartList: any = [];
    productsList: any = [];
    productsListStatic: any = [];
    productSpinner: any = false;
    filterQuery: any = '';
    searchSpinner: any = false;
    showDiv: any = false;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public productsService: ProductsService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.getAllCartDataList();
        this.getAllProductsList();
    }

    getAllCartDataList() {
        this.productsService.getAllCartData().subscribe(async (response: any) => {
            console.log('Get all cart list response isss', response);
            if (response) {
                this.cartList = response;
            } else {
                this.toastr.errorToastr('Error while getting all cart list');
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
        });
    }

    getAllProductsList() {
        this.productSpinner = true;
        this.productsService.getAllProductsData().subscribe(async (response: any) => {
            console.log('Get all products list response isss', response);
            if (response) {
                this.productsList = response;
                this.productsListStatic = response;
            } else {
                this.toastr.errorToastr('Error while getting all products list');
            }
            this.productSpinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed. Please try again.');
            this.productSpinner = false;
        });
    }

    searchData() {
        if (this.filterQuery) {
            this.searchSpinner = true;
            setTimeout(() => {
                const searchItem = this.filterQuery.toLowerCase();
                const filterData = _.filter(this.productsListStatic, (ele: any) => {
                    return ele.title.toLowerCase().includes(searchItem) || ele.title.toLowerCase().match(/searchItem/g);
                });
                console.log('filterData isss', filterData);
                this.productsList = filterData;
                this.searchSpinner = false;
            }, 500);
        }
    }

    resetData() {
        if (!this.filterQuery || this.filterQuery === '') {
            this.searchSpinner = true;
            setTimeout(() => {
                this.productsList = [];
                this.searchSpinner = false;
            }, 500);
        } else {
            this.searchSpinner = true;
            setTimeout(() => {
                const searchItem = this.filterQuery.toLowerCase();
                const filterData = _.filter(this.productsListStatic, (ele: any) => {
                    return ele.title.toLowerCase().includes(searchItem) || ele.title.toLowerCase().match(/searchItem/g);
                });
                console.log('filterData isss', filterData);
                this.productsList = filterData;
                this.searchSpinner = false;
            }, 500);
        }
    }

    @HostListener('document:click', ['$event']) onDocumentClick(event?: any) {
        this.showPopup(2, event);
        event.stopPropagation();
    }

    showPopup(id?: any, event?: any) {
        if (Number(id) === 1) {
            this.showDiv = true;
            event.stopPropagation();
        } else {
            this.showDiv = false;
        }
    }
}
