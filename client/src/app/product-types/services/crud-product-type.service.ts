import { Injectable } from '@angular/core';
import { BaseCrudService } from 'src/app/shared/services/crud-service-base.service';
import { ProductTypeDetail } from '../components/product-type-detail/product-type-detail.component';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class CrudProductTypeService extends BaseCrudService<ProductTypeDetail, ProductTypeDetail> {
  constructor(public service: BaseServiceService) {
    super(service);
  }
}