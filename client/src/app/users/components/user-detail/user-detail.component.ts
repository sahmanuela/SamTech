import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder} from "@angular/forms";
import {CrudServiceUserService, UserDetail} from "../../services/crud-service-user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ManageData} from "../../../shared/components/crud/crud.component";
import {BaseServiceService} from "../../../shared/services/base-service.service";
import {DialogMessageService} from "../../../shared/services/dialog-message.service";

export interface PerfilGridItem {
    id: number;
    nome: string;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    userForm: FormGroup<{
        name: FormControl<string>;
        email: FormControl<string>;
        password: FormControl<string | null>;
    }>;
    private data!: UserDetail;
    saving: boolean = false;
    isLoading: boolean = true;
    perfis: PerfilGridItem[] = [];

    constructor(
        private formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA)
        public settingsData: ManageData,
        public crudService: CrudServiceUserService,
        public dialog: DialogMessageService,
        public baseService: BaseServiceService
    ) {
        this.userForm = this.formBuilder.group({
            name: new FormControl<string>({
                value: '',
                disabled: this.settingsData.action === 'view',
            }),
            email: new FormControl<string>({
                value: '',
                disabled: this.settingsData.action === 'view',
            }),
            password: new FormControl<string | null>({
                value: null,
                disabled: this.settingsData.action === 'view',
            }),
        });
    }

    ngOnInit(): void {
        if (this.settingsData.action !== 'new' && this.settingsData.id) {
            this.crudService
                .getById('users', this.settingsData.id)
                .subscribe(response => {
                    console.log({response})
                    const user: UserDetail = response.data as unknown as UserDetail;
                    this.data = user;
                    this.userForm.controls['name'].setValue(
                        user.name
                    );
                    this.userForm.controls['email'].setValue(
                        user.email
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
        const data: UserDetail = this.userForm.value as UserDetail;
        this.crudService
            .defaultSave('users', data, this.settingsData, this.crudService, this.dialog)
            .then(() => (this.saving = false), () => (this.saving = false));
    }
}
