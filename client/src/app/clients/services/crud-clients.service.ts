import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/shared/services/crud-service-base.service';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { ClientsDetail } from '../components/clients-detail/clients-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CrudClientsService extends BaseCrudService<ClientsDetail, ClientsDetail> {
  constructor(public service: BaseServiceService) {
    super(service);
  }
}