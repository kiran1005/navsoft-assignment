import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user-model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  getUrl = 'https://jsonplaceholder.typicode.com/posts';
  dummyData: any;
  currentUserPer: string;
  isEdit: boolean;
  EditUserId: string;
  addPostForm: FormGroup;

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {
    this.addPostForm = this._FormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.isEdit = false;
    this.currentUserPer = localStorage.getItem('permission');
    console.log(this.currentUserPer);

    this.getDummyData();
  }

  getDummyData() {
    this._HttpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
      console.log(data);
      this.dummyData = data;
      console.log(this.dummyData);
    });
  }

  deleteEmp(id: any) {
    this.dummyData.forEach((val, index, array) => {
      if (val.id === id) {
        array.splice(index, 1);
      }
    })
  }

  editEmp(id: any) {

    this.isEdit = true;
    this.EditUserId = id;
    this.dummyData.forEach((val, index, array) => {
      if (val.id === id) {
        this.addPostForm.controls.title.setValue(val.title);
        this.addPostForm.controls.description.setValue(val.body);
      }
    })
  }

  logout() {
    localStorage.removeItem('permission');
    this._Router.navigate(['/login']);
  }

  add() {
    // this._Router.navigate(['/blog/add-post']);
    this.isEdit = true;
  }

  onSubmit() {
    if (this.currentUserPer === 'Add') {
      const test = Object.assign({}, {
        id: this.dummyData.length + 1,
        title: this.addPostForm.controls.title.value,
        body: this.addPostForm.controls.description.value,
      });
      this.dummyData.push(test as any);
      console.log(this.dummyData);
    } else {
      this.dummyData.forEach((val, index, array) => {
        if (val.id === this.EditUserId) {
          array.splice(index, 1);
          const test = Object.assign({}, {
            id: val.id,
            userId: val.userId,
            title: this.addPostForm.controls.title.value,
            body: this.addPostForm.controls.description.value,

          });
          this.dummyData.push(test as any)
        }
      })
    }
    this.isEdit = false;
  }


}
