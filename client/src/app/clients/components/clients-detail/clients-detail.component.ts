import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageData } from 'src/app/shared/components/crud/crud.component';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { DialogMessageService } from 'src/app/shared/services/dialog-message.service';
import { CrudClientsService } from '../../services/crud-clients.service';

export interface ClientsDetail {
  id: number;
  name: string;
  email: number;
  phone: string;
  document: string;
  document_type_id: number;
}

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrl: './clients-detail.component.scss'
})
export class ClientsDetailComponent {

  form: FormGroup<{
    name: FormControl<string>;
    email: FormControl<number>;
    phone: FormControl<string>;
    document: FormControl<string>;
    document_type_id: FormControl<number>;
  }>;

  private data!: ClientsDetail;
  saving: boolean = false;
  isLoading: boolean = true;

  constructor(
      private formBuilder: UntypedFormBuilder,
      @Inject(MAT_DIALOG_DATA)
      public settingsData: ManageData,
      public crudService: CrudClientsService,
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
    this.crudService.listSelectOptions('clientes', '/tipos-documento').subscribe(response => {
      this.documentTypes = response.data;   
    })

      if (this.settingsData.action !== 'new' && this.settingsData.id) {
          this.crudService
              .getById('clientes', this.settingsData.id)
              .subscribe(response => {
                  const item: ClientsDetail = response.data as unknown as ClientsDetail;
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
      const data: ClientsDetail = this.form.value as ClientsDetail;
      data.id = this.data?.id ?? null;
      this.crudService
          .defaultSave('clientes', data, this.settingsData, this.crudService, this.dialog)
          .then(() => (this.saving = false), () => (this.saving = false));
  }

}
