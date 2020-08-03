import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponents, BlogRoutingModule } from './blog-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    BlogComponents
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BlogRoutingModule,
    BrowserModule

  ]
})
export class BlogModule { }
