import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {Subject} from "rxjs";
import {DialogMessageService} from "../../../shared/services/dialog-message.service";

export interface MenuItem {
    path: string;
    name: string;
    children?: MenuItem[];
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    private isLoggedInSubject = new Subject();
    isLoggedIn = this.isLoggedInSubject.asObservable();
    isLogged = false;
    menu: MenuItem[] = []
    all_menu: MenuItem[] = [
        {
            path: '/transacoes',
            name: 'Transações',
        },
        {
            path: '/usuarios',
            name: 'Usuários',
        },
        {
            path: '/produtos',
            name: 'Produtos',
        },
        {
            path: '/fornecedores',
            name: 'Fornecedores',
        },
        {
            path: '/clientes',
            name: 'Clientes',
        },
        {
            path: '/tipos-de-produtos',
            name: 'Tipos de produtos',
        },
        
    ]

    user: string | null = null;


    constructor(
        public menuService: MenuService,
        public dialogService: DialogMessageService,
    ) {}

    ngOnInit() {
        window.addEventListener('message', (event) => {
            if (typeof event.data === "string" && event.data.includes('loggedin')) {
                const data = event.data.split(':')
                this.isLoggedInSubject.next(data[1] === 'true')
            }
        });

        const token = localStorage.getItem('token');
        if (token) {
            this.menuService.checkLoggedIn().subscribe(() => {
                this.isLoggedInSubject.next(true);
            })
        }

        this.isLoggedIn.subscribe(status => {
            this.menu = [];
            this.isLogged = false;

            if (status) {
                this.isLogged = true;
                this.menu = this.all_menu;
                this.user = localStorage.getItem('user_name');
                if (this.user === 'undefined') this.user = null;
            }
        })
    }

}
