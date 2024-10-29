import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CrudTableColumnInterface } from 'src/app/shared/components/table/table.component';
import { ProductTypeCrudComponent } from '../product-type-crud/product-type-crud.component';
import { ProductTypeDetailComponent } from '../product-type-detail/product-type-detail.component';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrl: './product-types.component.scss'
})
export class ProductTypesComponent implements AfterViewInit {
  @ViewChild(ProductTypeCrudComponent)
  public crudComponent!: ProductTypeCrudComponent;

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
          id: 'is_digital',
          title: 'Produto digital',
          value: 'digital',
      },
  ];

  manageComponent = ProductTypeDetailComponent;
  constructor() {}

  ngAfterViewInit() {
      this.crudComponent.reload();
  }
}
