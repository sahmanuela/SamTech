import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from 'src/app/auth/services/permissions.service';
import { CrudComponent } from 'src/app/shared/components/crud/crud.component';
import { CrudClientsService } from '../../services/crud-clients.service';
@Component({
  selector: 'app-clients-crud',
  templateUrl: '../../../shared/components/crud/crud.component.html',
  styleUrls: ['../../../shared/components/crud/crud.component.scss']
})
export class ClientsCrudComponent  extends CrudComponent<CrudClientsService> {
  filter: string = '';
  constructor(
      route: ActivatedRoute,
      router: Router,
      dialog: MatDialog,
      crudService: CrudClientsService,
      permissionsService: PermissionsService
  ) {
      super(route, router, dialog, permissionsService);
      this.setCrudService(crudService);
  }
}
