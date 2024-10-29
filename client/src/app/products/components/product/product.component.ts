import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CrudTableColumnInterface } from 'src/app/shared/components/table/table.component';
import { ProductCrudComponent } from '../product-crud/product-crud.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit {
  @ViewChild(ProductCrudComponent)
  public crudComponent!: ProductCrudComponent;

  crudContext = new Map<string, string>();

  columns: CrudTableColumnInterface[] = [
      {
          id: 'id',
          title: 'ID',
          value: 'id',
      },
      {
          id: 'name',
          title: 'Nome',
          value: 'name',
      },
      {
          id: 'cost_price',
          title: 'Preço de custo',
          value: 'cost_price',
      },
      {
          id: 'selling_price',
          title: 'Preço de venda',
          value: 'selling_price',
      },
      {
          id: 'type',
          title: 'Tipo',
          value: 'type',
      },
      {
          id: 'supplier',
          title: 'Fornecedor',
          value: 'supplier',
      },
  ];

  manageComponent = ProductDetailComponent;
  constructor() {}

  ngAfterViewInit() {
      this.crudComponent.reload();
  }
}
