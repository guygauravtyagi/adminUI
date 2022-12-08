import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { DataTableModule } from '../data-table/data-table.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    DataTableModule,
    SharedModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
