import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user-model';
import { UserlistService } from 'src/app/services/user-list.service';
import { ExportExcelService } from 'src/app/export-to-excel.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersData: User[];
  selectValue: string;
  permissions: string[];
  @ViewChild('tbldata', { static: false }) content: ElementRef;
  constructor(
    private _UserlistService: UserlistService,
    private _ExportExcelService: ExportExcelService
  ) {
    this.permissions = ['Select', 'Add', 'Edit', 'Delete']
    this.usersData = [];
  }

  ngOnInit(): void {
    const temp = this._UserlistService.getUserData();
    this.usersData = JSON.parse(temp);

    console.log(this.usersData);
  }


  onPdf() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor'(element, renderer) {
        return true;
      }
    };

    const content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers

    });
    doc.save('test.pdf');
  }

  onExcel() {
    this._ExportExcelService.exportAsExcelFile(
      (() => {
        return this.usersData.map((val) => {
          return {
            'id': val.id,
            'User_name': val.name,
            'Email': val.email,
            'Mobile': val.mobile,
            'Passowrd': val.password,
            'Permission': val.permission,
            'Role': val.role
          };
        });
      })()
      ,
      'export_data')
  }
  permissionChange(event: any, userId: any) {
    this.usersData.forEach((val, index, array) => {
      if (val.id === userId) {
        array.splice(index, 1);
        const test = Object.assign({}, {
          id: val.id,
          name: val.name,
          password: val.password,
          mobile: val.mobile,
          email: val.email,
          role: val.role,
          permission: event.target.value
        });
        this.usersData.push(test as any)

      }
    });
    localStorage.clear();
    this._UserlistService.setUserData(this.usersData);
  }
}
