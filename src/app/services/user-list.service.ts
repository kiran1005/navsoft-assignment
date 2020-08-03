import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserlistService {

    constructor() { }

    setUserData(usersData) {
        localStorage.setItem('user-list', JSON.stringify(usersData))
    }

    getUserData() {
        return localStorage.getItem('user-list');
    }
}