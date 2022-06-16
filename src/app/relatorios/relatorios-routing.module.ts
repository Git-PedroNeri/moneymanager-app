import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RelatorioLancamentosComponent } from "./relatorio-lancamentos/relatorio-lancamentos.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { RelatoriosProdutoComponent } from "./relatorios-produto/relatorios-produto.component";

const routes: Routes = [
  {
    path: "lancamentos",
    component: RelatorioLancamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_LANCAMENTO"] },
  },
  {
    path: "produtos",
    component: RelatoriosProdutoComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_PRODUTO"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoriosRoutingModule {}
