import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("src/app/pages/home/home.module").then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: "gastos",
        loadChildren: () =>
          import("src/app/pages/gastos/gastos.module").then(
            (m) => m.GastosPageModule
          ),
      },
    ],
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
