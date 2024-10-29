import { Injectable } from '@angular/core';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { BaseCrudService } from 'src/app/shared/services/crud-service-base.service';
import { TransactionDetail } from '../components/transaction-detail/transaction-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CrudTransactionService extends BaseCrudService<TransactionDetail, TransactionDetail> {
  constructor(public service: BaseServiceService) {
    super(service);
  }
}