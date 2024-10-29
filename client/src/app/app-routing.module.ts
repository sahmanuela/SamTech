import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {UsersComponent} from "./users/components/users/users.component";
import {HasRoleGuard} from "./auth/guards/has-role.guard";
import {ProfileComponent} from "./users/components/profile/profile.component";
import { ProductTypesComponent } from './product-types/components/product-types/product-types.component';
import { ProductComponent } from './products/components/product/product.component';
import { SupplierComponent } from './suppliers/components/supplier/supplier.component';
import { ClientsComponent } from './clients/components/clients/clients.component';
import { TransactionComponent } from './transactions/components/transaction/transaction.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'perfil',
        component: ProfileComponent,
    },
    {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [HasRoleGuard],
        children: [
            {
                path: ':status',
                component: UsersComponent,
                canActivate: [HasRoleGuard],
            },
            {
                path: ':status/:id',
                component: UsersComponent,
                canActivate: [HasRoleGuard],
            },
        ]
    },
    {
        path: 'tipos-de-produtos',
        component: ProductTypesComponent,
        canActivate: [HasRoleGuard],
        children: [
            {
                path: ':status',
                component: ProductTypesComponent,
                canActivate: [HasRoleGuard],
            },
            {
                path: ':status/:id',
                component: ProductTypesComponent,
                canActivate: [HasRoleGuard],
            },
        ]
    },
    {
        path: 'produtos',
        component: ProductComponent,
        canActivate: [HasRoleGuard],
        children: [
            {
                path: ':status',
                component: ProductComponent,
                canActivate: [HasRoleGuard],
            },
            {
                path: ':status/:id',
                component: ProductComponent,
                canActivate: [HasRoleGuard],
            },
        ]
    },
    {
        path: 'fornecedores',
        component: SupplierComponent,
        canActivate: [HasRoleGuard],
        children: [
            {
                path: ':status',
                component: SupplierComponent,
                canActivate: [HasRoleGuard],
            },
            {
                path: ':status/:id',
                component: SupplierComponent,
                canActivate: [HasRoleGuard],
            },
        ]
    },
    {
        path: 'clientes',
        component: ClientsComponent,
        canActivate: [HasRoleGuard],
        children: [
            {
                path: ':status',
                component: ClientsComponent,
                canActivate: [HasRoleGuard],
            },
            {
                path: ':status/:id',
                component: ClientsComponent,
                canActivate: [HasRoleGuard],
            },
        ]
    },
    {
        path: 'transacoes',
        component: TransactionComponent,
        canActivate: [HasRoleGuard],
        children: [
            {
                path: ':status',
                component: TransactionComponent,
                canActivate: [HasRoleGuard],
            },
            {
                path: ':status/:id',
                component: TransactionComponent,
                canActivate: [HasRoleGuard],
            },
        ]
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
