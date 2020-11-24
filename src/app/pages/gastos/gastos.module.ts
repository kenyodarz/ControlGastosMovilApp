import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimengModule } from "src/app/shared/primeng.module";

import { GastosPageRoutingModule } from './gastos-routing.module';

import { GastosPage } from './gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GastosPageRoutingModule,
    PrimengModule,
  ],
  declarations: [GastosPage],
})
export class GastosPageModule {}
