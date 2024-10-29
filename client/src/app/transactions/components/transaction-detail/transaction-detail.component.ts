import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageData } from 'src/app/shared/components/crud/crud.component';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { DialogMessageService } from 'src/app/shared/services/dialog-message.service';
import { CrudTransactionService } from '../../services/crud-transaction.service';

export interface selectOption {
  id: number;
  label: string;
}

export interface TransactionDetail {
    id: number;
    description: string;
    client_id: number;
    status_id: number;
  }

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {

  form: FormGroup;
  saving: boolean = false;
  isLoading: boolean = true;

  clients: Array<selectOption> = [];
  status: Array<selectOption> = [];
  productsList: Array<selectOption> = [];

  private data!: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public settingsData: ManageData,
    public crudService: CrudTransactionService,
    public dialog: DialogMessageService,
    public baseService: BaseServiceService
  ) {
    this.form = this.formBuilder.group({
      client_id: new FormControl<number | null>(
        { value: null, disabled: this.settingsData.action === 'view' },
        [Validators.required]
      ),
      status_id: new FormControl<number | null>(
        { value: null, disabled: this.settingsData.action === 'view' },
        [Validators.required]
      ),
      description: new FormControl<string>(
        { value: '', disabled: this.settingsData.action === 'view' }
      ),
      discount: new FormControl({ value: 0, disabled: this.settingsData.action === 'view' }, [Validators.required, Validators.min(0), Validators.max(100)]),
      products: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.crudService.listSelectOptions('transacoes', '/clientes').subscribe(response => {
      this.clients = response.data as selectOption[];
    });

    this.crudService.listSelectOptions('transacoes', '/status').subscribe(response => {
      this.status = response.data as selectOption[];
    });

    this.crudService.listSelectOptions('transacoes', '/produtos').subscribe(response => {
      this.productsList = response.data as selectOption[];
    });

    if (this.settingsData.action !== 'new' && this.settingsData.id) {
      this.crudService.getById('transacoes', this.settingsData.id).subscribe(response => {
        this.data = response.data;
        (response as any).produtos?.forEach((product: any) => this.addProduct(product));
        this.form.patchValue(this.data);
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }


  get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addProduct(product?: any): void {
    const productGroup = this.formBuilder.group({
      count: new FormControl({ value: product?.count || 1, disabled: this.settingsData.action === 'view' }, [Validators.required, Validators.min(1)]),
      product_id: new FormControl({ value: product?.product_id || null, disabled: this.settingsData.action === 'view' }, [Validators.required]),
    });
    this.products.push(productGroup);
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  save() {
    if (this.settingsData.action === 'view') return;

    this.saving = true;
    const formData = this.form.value;
    formData.id = this.data?.id ?? null;

    this.crudService.defaultSave('transacoes', formData, this.settingsData, this.crudService, this.dialog)
      .then(() => (this.saving = false))
      .catch(() => (this.saving = false));
  }
}
