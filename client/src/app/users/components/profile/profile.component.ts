import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder} from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from "rxjs";
import {DialogMessageService} from "../../../shared/services/dialog-message.service";

interface ProfileRequest {
   success: boolean;
   data: {
       name: string;
       email: string;
   }
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userForm: FormGroup<{
        name: FormControl<string>;
        email: FormControl<string>;
        password: FormControl<string | null>;
    }>;

    isLoading: boolean = true;
    saving: boolean = false;

    constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient, private dialogMessageService: DialogMessageService) {
        this.userForm = this.formBuilder.group({
            name: new FormControl<string>({
                value: '',
                disabled: false,
            }),
            email: new FormControl<string>({
                value: '',
                disabled: false,
            }),
            password: new FormControl<string | null>({
                value: '',
                disabled: false,
            }),
        });
    }

    ngOnInit() {
        this.http
            .get(`/profile`, {
                responseType: 'text',
                params: {
                    id: localStorage.getItem('user_id') as string,
                }
            })
            .pipe(map(res => JSON.parse(res)))
            .toPromise()
            .then(
                (response : ProfileRequest) => {
                    this.isLoading = false;
                    console.log('dada', response.data)
                    this.userForm.setValue({
                        name: response.data.name,
                        email: response.data.email,
                        password: null,
                    })
                }
            )
    }

    save() {
        this.saving = true;
        const headers = new HttpHeaders().set(
            'Content-type',
            'application/json'
        );
        return this.http
                .post(`/profile`, JSON.stringify({ ... this.userForm.value, id: localStorage.getItem('user_id') }), {
                headers,
                responseType: 'text',
            })
            .toPromise()
            .then(() => {
                this.dialogMessageService.success('Alterações efetuadas com sucesso').then();
                this.saving = false;
            });
    }

}
