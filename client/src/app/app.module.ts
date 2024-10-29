import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IConfig, provideNgxMask } from 'ngx-mask'; // Certifique-se desse caminho
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ClientsCrudComponent } from './clients/components/clients-crud/clients-crud.component';
import { ClientsDetailComponent } from './clients/components/clients-detail/clients-detail.component';
import { ClientsComponent } from './clients/components/clients/clients.component';
import { APIInterceptor } from "./core/interceptors/APIInterceptor.module";
import { AngularMaterialModule } from "./core/modules/angular-material/angular-material.module";
import { MenuComponent } from './layout/components/menu/menu.component';
import { ProductTypeCrudComponent } from './product-types/components/product-type-crud/product-type-crud.component';
import { ProductTypeDetailComponent } from './product-types/components/product-type-detail/product-type-detail.component';
import { ProductTypesComponent } from './product-types/components/product-types/product-types.component';
import { ProductCrudComponent } from './products/components/product-crud/product-crud.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { ProductComponent } from './products/components/product/product.component';
import { DialogMessageComponent } from './shared/components/dialog-message/dialog-message.component';
import { TableComponent } from "./shared/components/table/table.component";
import { SupplierCrudComponent } from './suppliers/components/supplier-crud/supplier-crud.component';
import { SupplierDetailComponent } from './suppliers/components/supplier-detail/supplier-detail.component';
import { SupplierComponent } from './suppliers/components/supplier/supplier.component';
import { TransactionCrudComponent } from './transactions/components/transaction-crud/transaction-crud.component';
import { TransactionDetailComponent } from './transactions/components/transaction-detail/transaction-detail.component';
import { TransactionComponent } from './transactions/components/transaction/transaction.component';
import { ProfileComponent } from './users/components/profile/profile.component';
import { UserCrudComponent } from './users/components/user-crud/user-crud.component';
import { UserDetailComponent } from './users/components/user-detail/user-detail.component';
import { UsersComponent } from './users/components/users/users.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

const maskConfig: Partial<IConfig> = {
    validation: true
};

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        UsersComponent,
        TableComponent,
        UserCrudComponent,
        UserDetailComponent,
        DialogMessageComponent,
        ProfileComponent,
        MenuComponent,
        ProductTypeCrudComponent,
        ProductTypeDetailComponent,
        ProductTypesComponent,
        ProductCrudComponent,
        ProductDetailComponent,
        ProductComponent,
        SupplierCrudComponent,
        SupplierDetailComponent,
        SupplierComponent,
        ClientsCrudComponent,
        ClientsDetailComponent,
        ClientsComponent,
        TransactionComponent,
        TransactionCrudComponent,
        TransactionDetailComponent,
    ],
    bootstrap: [AppComponent],
     imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        QuillModule.forRoot(),
    ],
     providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
        provideNgxMask(maskConfig),
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        },
        // provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
