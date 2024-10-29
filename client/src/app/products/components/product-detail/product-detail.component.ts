import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageData } from 'src/app/shared/components/crud/crud.component';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { DialogMessageService } from 'src/app/shared/services/dialog-message.service';
import { CrudProductService } from '../../services/crud-product.service';

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  cost_price: number;
  selling_price: number;
  product_type_id: number;
  supplier_id: number;
}

export interface ProductGridItem {
  id: number;
  name: string;
  description: string;
  cost_price: number;
  selling_price: number;
  type: string;
  supplier: string;
}

export interface selectOption {
    id: number;
    label: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  form: FormGroup;

  private data!: ProductDetail;
  saving: boolean = false;
  isLoading: boolean = true;

  constructor(
      private formBuilder: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA)
      public settingsData: ManageData,
      public crudService: CrudProductService,
      public dialog: DialogMessageService,
      public baseService: BaseServiceService
  ) {
      this.form = this.formBuilder.group({
          name: new FormControl<string>({
              value: '',
              disabled: this.settingsData.action === 'view',
          }, [Validators.required]),
        description: new FormControl<string>({
            value: '',
            disabled: this.settingsData.action === 'view',
        }),
        cost_price: new FormControl<number|null>({
            value: null,
            disabled: this.settingsData.action === 'view',
        }, [Validators.required, Validators.min(0)]),
        selling_price: new FormControl<number|null>({
            value: null,
            disabled: this.settingsData.action === 'view',
        }, [Validators.required, Validators.min(0)]),
        product_type_id: new FormControl<number|null>({
            value: null,
            disabled: this.settingsData.action === 'view',
        }, [Validators.required]),
        supplier_id: new FormControl<number|null>({
            value: null,
            disabled: this.settingsData.action === 'view',
        }, [Validators.required]),
      });
  }

  editorConfig: any;
  types: Array<selectOption> = [];
  suppliers: Array<selectOption> = [];
  ngOnInit(): void {
        this.crudService.listSelectOptions('produtos', '/tipos').subscribe(response => {
            const data = response.data as unknown as selectOption[];
            this.types = data;
        })
        this.crudService.listSelectOptions('produtos', '/fornecedores').subscribe(response => {
            const data = response.data as unknown as selectOption[];
            this.suppliers = data;
        })
    
      if (this.settingsData.action !== 'new' && this.settingsData.id) {
          this.crudService
              .getById('produtos', this.settingsData.id)
              .subscribe(response => {
                  const item: ProductDetail = response.data as unknown as ProductDetail;
                  this.data = item;
                  this.form.patchValue(item);
                  this.isLoading = false;
              });
      } else {
          this.isLoading = false;
      }
  }

  save() {
      if (this.settingsData.action === 'view') return;
      this.saving = true;
      const data: ProductDetail = this.form.value as ProductDetail;
      data.id = this.data?.id ?? null;
      this.crudService
          .defaultSave('produtos', data, this.settingsData, this.crudService, this.dialog)
          .then(() => (this.saving = false), () => (this.saving = false));
  }

}
