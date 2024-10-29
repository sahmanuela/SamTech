import { Component } from '@angular/core';
import { CrudComponent } from 'src/app/shared/components/crud/crud.component';
import { PermissionsService } from 'src/app/auth/services/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudProductService } from '../../services/crud-product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: '../../../shared/components/crud/crud.component.html',
  styleUrls: ['../../../shared/components/crud/crud.component.scss']
})
export class ProductCrudComponent  extends CrudComponent<CrudProductService> {
  filter: string = '';
  constructor(
      route: ActivatedRoute,
      router: Router,
      dialog: MatDialog,
      crudService: CrudProductService,
      permissionsService: PermissionsService
  ) {
      super(route, router, dialog, permissionsService);
      this.setCrudService(crudService);
  }
}
