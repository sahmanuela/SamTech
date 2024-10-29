import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageData } from 'src/app/shared/components/crud/crud.component';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { DialogMessageService } from 'src/app/shared/services/dialog-message.service';
import { CrudSupplierService } from '../../services/crud-supplier.service';

export interface SupplierDetail {
  id: number;
  name: string;
  email: number;
  phone: string;
  document: string;
  document_type_id: number;
}

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.scss'
})
export class SupplierDetailComponent {

  form: FormGroup<{
    name: FormControl<string>;
    email: FormControl<number>;
    phone: FormControl<string>;
    document: FormControl<string>;
    document_type_id: FormControl<number>;
  }>;

  private data!: SupplierDetail;
  saving: boolean = false;
  isLoading: boolean = true;

  constructor(
      private formBuilder: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA)
      public settingsData: ManageData,
      public crudService: CrudSupplierService,
      public dialog: DialogMessageService,
      public baseService: BaseServiceService
  ) {
      this.form = this.formBuilder.group({
        name: new FormControl<string>(
          { value: '', disabled: this.settingsData.action === 'view' },
          [Validators.required]
        ),
        email: new FormControl<number | null>(
          { value: null, disabled: this.settingsData.action === 'view' },
          [Validators.required, Validators.email]
        ),
        phone: new FormControl<string>(
          { value: '', disabled: this.settingsData.action === 'view' },
          [Validators.required]
        ),
        document: new FormControl<string>(
          { value: '', disabled: this.settingsData.action === 'view' },
          [Validators.required]
        ),
        document_type_id: new FormControl<number | null>(
          { value: null, disabled: this.settingsData.action === 'view' },
          [Validators.required]
        )
      });
    }

    documentTypes: Array<{ id: number; name: string; descriptive_id?: string }> = [];

  editorConfig: any;
  ngOnInit(): void {
    this.crudService.listSelectOptions('fornecedores', '/tipos-documento').subscribe(response => {
      this.documentTypes = response.data;   
    })

      if (this.settingsData.action !== 'new' && this.settingsData.id) {
          this.crudService
              .getById('fornecedores', this.settingsData.id)
              .subscribe(response => {
                  const item: SupplierDetail = response.data as unknown as SupplierDetail;
                  this.data = item;
                  this.form.patchValue(this.data);
                  this.isLoading = false;
              });
      } else {
          this.isLoading = false;
      }
  }

  save() {
      if (this.settingsData.action === 'view') return;
      this.saving = true;
      const data: SupplierDetail = this.form.value as SupplierDetail;
      data.id = this.data?.id ?? null;
      this.crudService
          .defaultSave('fornecedores', data, this.settingsData, this.crudService, this.dialog)
          .then(() => (this.saving = false), () => (this.saving = false));
  }

}
