import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContabilidadeComponent } from "app/contabilidade/contabilidade.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
