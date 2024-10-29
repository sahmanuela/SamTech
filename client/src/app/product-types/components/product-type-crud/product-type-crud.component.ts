import { Component } from '@angular/core';
import { CrudComponent } from 'src/app/shared/components/crud/crud.component';
import { CrudProductTypeService } from '../../services/crud-product-type.service';
import { PermissionsService } from 'src/app/auth/services/permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-type-crud',
  templateUrl: '../../../shared/components/crud/crud.component.html',
  styleUrls: ['../../../shared/components/crud/crud.component.scss']
})
export class ProductTypeCrudComponent  extends CrudComponent<CrudProductTypeService> {
  filter: string = '';
  constructor(
      route: ActivatedRoute,
      router: Router,
      dialog: MatDialog,
      crudService: CrudProductTypeService,
      permissionsService: PermissionsService
  ) {
      super(route, router, dialog, permissionsService);
      this.setCrudService(crudService);
  }
}
