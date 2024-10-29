import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CrudTableColumnInterface } from 'src/app/shared/components/table/table.component';
import { SupplierCrudComponent } from '../supplier-crud/supplier-crud.component';
import { SupplierDetailComponent } from '../supplier-detail/supplier-detail.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements AfterViewInit {
  @ViewChild(SupplierCrudComponent)
  public crudComponent!: SupplierCrudComponent;

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
          id: 'email',
          title: 'Email',
          value: 'email',
      },
  ];

  manageComponent = SupplierDetailComponent;
  constructor() {}

  ngAfterViewInit() {
      this.crudComponent.reload();
  }
}
