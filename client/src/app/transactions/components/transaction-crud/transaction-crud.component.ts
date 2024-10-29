import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from 'src/app/auth/services/permissions.service';
import { CrudComponent } from 'src/app/shared/components/crud/crud.component';
import { CrudTransactionService } from '../../services/crud-transaction.service';

@Component({
  selector: 'app-transaction-crud',
  templateUrl: '../../../shared/components/crud/crud.component.html',
  styleUrls: ['../../../shared/components/crud/crud.component.scss']
})
export class TransactionCrudComponent  extends CrudComponent<CrudTransactionService> {
  filter: string = '';
  constructor(
      route: ActivatedRoute,
      router: Router,
      dialog: MatDialog,
      crudService: CrudTransactionService,
      permissionsService: PermissionsService
  ) {
      super(route, router, dialog, permissionsService);
      this.setCrudService(crudService);
  }
}
