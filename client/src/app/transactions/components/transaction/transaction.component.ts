import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CrudTableColumnInterface } from 'src/app/shared/components/table/table.component';
import { TransactionCrudComponent } from '../transaction-crud/transaction-crud.component';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements AfterViewInit {
  @ViewChild(TransactionCrudComponent)
  public crudComponent!: TransactionCrudComponent;

  crudContext = new Map<string, string>();

  columns: CrudTableColumnInterface[] = [
      {
          id: 'id',
          title: 'ID',
          value: 'id',
      },
      {
          id: 'client',
          title: 'Cliente',
          value: 'client',
      },
      {
          id: 'status',
          title: 'Status',
          value: 'status',
      },
      {
          id: 'total_amount',
          title: 'Preço',
          value: 'total_amount',
      },
      {
          id: 'discount',
          title: 'Desconto',
          value: 'discount',
      },
  ];

  manageComponent = TransactionDetailComponent;
  constructor() {}

  ngAfterViewInit() {
      this.crudComponent.reload();
  }
}
