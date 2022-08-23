import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin/admin.component";
import { ContabilidadeComponent } from "./contabilidade/contabilidade/contabilidade.component";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.component";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";

const routes: Routes = [
  {
    path: "contabilidade",
    component: ContabilidadeComponent,
  },
  { path: "admin", component: AdminComponent },
  { path: "admin/novo", component: AdminComponent },
  { path: "admin/:token", component: ContabilidadeComponent },

  {
    path: "lancamentos",
    loadChildren: () =>
      import("app/lancamentos/lancamentos.module").then(
        (m) => m.LancamentosModule
      ),
  },
  {
    path: "pessoas",
    loadChildren: () =>
      import("app/pessoas/pessoas.module").then((m) => m.PessoasModule),
  },
  {
    path: "produtos",
    loadChildren: () =>
      import("app/produtos/produtos/produtos.module").then(
        (m) => m.ProdutosModule
      ),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("app/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "relatorios",
    loadChildren: () =>
      import("app/relatorios/relatorios.module").then(
        (m) => m.RelatoriosModule
      ),
  },
  {
    path: "usuarios",
    loadChildren: () =>
      import("app/usuarios/usuarios.module").then((m) => m.UsuariosModule),
  },

  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "nao-autorizado", component: NaoAutorizadoComponent },
  { path: "pagina-nao-encontrada", component: PaginaNaoEncontradaComponent },
  { path: "**", redirectTo: "pagina-nao-encontrada" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
