import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { PrimengModule } from "src/app/shared/primeng.module";

import { InformesPageRoutingModule } from './informes-routing.module';

import { InformesPage } from './informes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    IonicModule,
    InformesPageRoutingModule,
    PrimengModule,
  ],
  declarations: [InformesPage],
})
export class InformesPageModule {}
