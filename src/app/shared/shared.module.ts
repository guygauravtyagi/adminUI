import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { RoundButtonComponent } from './round-button/round-button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';



@NgModule({
  declarations: [
    ButtonComponent,
    RoundButtonComponent,
    IconButtonComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    ButtonComponent,
    RoundButtonComponent,
    IconButtonComponent
  ]
})
export class SharedModule { }
