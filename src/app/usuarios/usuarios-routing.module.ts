import { UsuarioSearchComponent } from "./usuario-search/usuario-search.component";
import { Injectable, NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { AuthGuard } from "app/seguranca/auth.guard";
import { UsuarioFormComponent } from "./usuario-form/usuario-form.component";
import { Usuario } from "./models/usuario";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
@Injectable({ providedIn: "root" })
export class UsuarioResolve implements Resolve<Usuario> {
  constructor(private service: UsuarioService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Usuario> {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service.getById(id);
    }
    return of(new Usuario());
  }
}
const routes: Routes = [
  {
    path: "",
    component: UsuarioSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PESQUISAR_USUARIO"] },
  },

  {
    path: "cadastrar",
    component: UsuarioFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_CADASTRAR_USUARIO"] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
