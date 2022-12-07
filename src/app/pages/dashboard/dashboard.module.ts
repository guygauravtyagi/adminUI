import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'src/app/features';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

/**
 * I can use ngx-pagination for this, but I chose to suffer.
 * Creating my own pagination Module.. lol
 */
import { PaginationModule } from "./../../features/pagination/pagination.module";


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    SharedModule,
    PaginationModule
  ]
})
export class DashboardModule { }
