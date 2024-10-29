import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CrudTableColumnInterface } from 'src/app/shared/components/table/table.component';
import { ClientsCrudComponent } from '../clients-crud/clients-crud.component';
import { ClientsDetailComponent } from '../clients-detail/clients-detail.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements AfterViewInit {
  @ViewChild(ClientsCrudComponent)
  public crudComponent!: ClientsCrudComponent;

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

  manageComponent = ClientsDetailComponent;
  constructor() {}

  ngAfterViewInit() {
      this.crudComponent.reload();
  }
}
