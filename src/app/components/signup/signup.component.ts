import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { UserlistService } from 'src/app/services/user-list.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

    userList: User[];

    registrationForm: FormGroup
    constructor(
        private _FormBuilder: FormBuilder,
        private _UserlistService: UserlistService,
        private _Router: Router
    ) {

        this.registrationForm = this._FormBuilder.group({
            role: ['user'],
            permission: ['All'],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            mobile: ['', [Validators.required, Validators.maxLength(10)]],
            password: ['',],
            confirmPassword: [''],

        }, { validators: passwordMatch })
    }
    ngOnInit() {
        const temp = this._UserlistService.getUserData();
        if (!temp) {
            this.userList = [];
        } else {
            this.userList = JSON.parse(temp);
        }
    }

    onSubmit() {
        this.userList.push(this.registrationForm.value);
        this.userList.map((val, index) => {
            val.id = `S-${index}`
        });
        this._UserlistService.setUserData(this.userList);
        this.registrationForm.reset();
        this._Router.navigate(['/login']);
    }
}

export const passwordMatch = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value
        ? { misMatch: true }
        : null;

};
