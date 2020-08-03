import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserlistService } from 'src/app/services/user-list.service';
import { User } from 'src/app/models/user-model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    usersList: User[];
    constructor(
        private _FormBuilder: FormBuilder,
        private _Router: Router,
        private _UserlistService: UserlistService
    ) {
        this.usersList = [];
        this.loginForm = this._FormBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }
    ngOnInit() {
        const temp = this._UserlistService.getUserData();
        this.usersList = JSON.parse(temp);
    }

    onClick() {
        this._Router.navigate(['/signup']);
    }
    onSubmit() {

        const check = this.checkEmailAndPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
        if (check) {
            this._Router.navigate(['/blog']);
        } else if (this.loginForm.controls.email.value === 'admin@gmail.com' && this.loginForm.controls.password.value === 'admin@123') {
            this._Router.navigate(['/admin']);
        } else {
            alert('Invalid Credentials');
        }
        this.loginForm.reset();
    }

    checkEmailAndPassword(email: any, password: any) {
        return this.usersList.some(val => {
            if (val.email === email && val.password === password) {
                localStorage.setItem('permission', val.permission);
                return true
            } else {
                return false
            }
        })
    }
}