import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { DataTableModule } from '../data-table/data-table.module';



@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    DataTableModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
