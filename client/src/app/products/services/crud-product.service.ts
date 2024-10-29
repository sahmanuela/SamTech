import { Injectable } from '@angular/core';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { BaseCrudService } from 'src/app/shared/services/crud-service-base.service';
import { ProductDetail, ProductGridItem } from '../components/product-detail/product-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CrudProductService extends BaseCrudService<ProductDetail, ProductGridItem> {
  constructor(public service: BaseServiceService) {
    super(service);
  }
}