import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminComponents, AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [adminComponents],
  imports: [
    AdminRoutingModule,
    CommonModule,
    BrowserModule
  ]
})
export class AdminModule { }
