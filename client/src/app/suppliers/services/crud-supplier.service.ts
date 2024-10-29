import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/shared/services/crud-service-base.service';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { SupplierDetail } from '../components/supplier-detail/supplier-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CrudSupplierService extends BaseCrudService<SupplierDetail, SupplierDetail> {
  constructor(public service: BaseServiceService) {
    super(service);
  }
}