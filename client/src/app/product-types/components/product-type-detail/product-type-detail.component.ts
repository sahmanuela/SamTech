import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageData } from 'src/app/shared/components/crud/crud.component';
import { CrudProductTypeService } from '../../services/crud-product-type.service';
import { DialogMessageService } from 'src/app/shared/services/dialog-message.service';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';

export interface ProductTypeDetail {
  id: number;
  name: string;
  is_digital: boolean;
}

@Component({
  selector: 'app-product-type-detail',
  templateUrl: './product-type-detail.component.html',
  styleUrl: './product-type-detail.component.scss'
})
export class ProductTypeDetailComponent {

  form: FormGroup<{
    name: FormControl<string>;
    is_digital: FormControl<boolean>;
  }>;

  private data!: ProductTypeDetail;
  saving: boolean = false;
  isLoading: boolean = true;

  constructor(
      private formBuilder: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA)
      public settingsData: ManageData,
      public crudService: CrudProductTypeService,
      public dialog: DialogMessageService,
      public baseService: BaseServiceService
  ) {
      this.form = this.formBuilder.group({
          name: new FormControl<string>({
              value: '',
              disabled: this.settingsData.action === 'view',
          }, [Validators.required]),
          is_digital: new FormControl<boolean>({
              value: false,
              disabled: this.settingsData.action === 'view',
          }, [Validators.required]),
      });
  }

  editorConfig: any;
  ngOnInit(): void {
      if (this.settingsData.action !== 'new' && this.settingsData.id) {
          this.crudService
              .getById('product-type', this.settingsData.id)
              .subscribe(response => {
                  const item: ProductTypeDetail = response.data as unknown as ProductTypeDetail;
                  this.data = item;
                  this.form.controls['name'].setValue(
                    item.name
                  );
                  this.form.controls['is_digital'].setValue(
                      item.is_digital
                  );
                  this.isLoading = false;
              });
      } else {
          this.isLoading = false;
      }
  }

  save() {
      if (this.settingsData.action === 'view') return;
      this.saving = true;
      const data: ProductTypeDetail = this.form.value as ProductTypeDetail;
      data.id = this.data?.id ?? null;
      this.crudService
          .defaultSave('product-type', data, this.settingsData, this.crudService, this.dialog)
          .then(() => (this.saving = false), () => (this.saving = false));
  }

}
