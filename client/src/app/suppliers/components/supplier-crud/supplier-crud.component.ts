import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from 'src/app/auth/services/permissions.service';
import { CrudComponent } from 'src/app/shared/components/crud/crud.component';
import { CrudSupplierService } from '../../services/crud-supplier.service';

@Component({
  selector: 'app-supplier-crud',
  templateUrl: '../../../shared/components/crud/crud.component.html',
  styleUrls: ['../../../shared/components/crud/crud.component.scss']
})
export class SupplierCrudComponent  extends CrudComponent<CrudSupplierService> {
  filter: string = '';
  constructor(
      route: ActivatedRoute,
      router: Router,
      dialog: MatDialog,
      crudService: CrudSupplierService,
      permissionsService: PermissionsService
  ) {
      super(route, router, dialog, permissionsService);
      this.setCrudService(crudService);
  }
}
