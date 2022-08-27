import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/seguranca/auth.guard";
import { ExtratoComponent } from "./transferencia/extrato/extrato/extrato.component";
import { TransferenciaComponent } from "./transferencia/transferencia.component";

const routes: Routes = [
  {
    path: "",
    component: TransferenciaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "extrato",
    component: ExtratoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferenciaRoutingModule {}
