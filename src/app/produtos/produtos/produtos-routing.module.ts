import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/seguranca/auth.guard";
import { ProdutoCadastroComponent } from "../produto-cadastro/produto-cadastro.component";
import { ProdutosPesquisaComponent } from '../produtos-pesquisa/produtos-pesquisa.component';

const routes: Routes = [
  {
    path: "",
    component: ProdutosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_PRODUTO"] },
  },
  {
    path: "nova",
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_CADASTRAR_PRODUTO"] },
  },
  {
    path: ":codigo",
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_CADASTRAR_PRODUTO"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
