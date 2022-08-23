import { Component, Injector, OnInit } from "@angular/core";
import { AuthService } from "app/seguranca/auth.service";
import { BaseResourceListV2Component } from "app/shared/abstract/base-resource-listv2.component";
import { Sort } from "app/shared/sort";
import { environment } from "environments/environment";
import { UsuarioFilter } from "../models/filter/usuarioFilter";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../usuario.service";

@Component({
  selector: "app-usuario-search",
  templateUrl: "./usuario-search.component.html",
  styleUrls: ["./usuario-search.component.css"],
})
export class UsuarioSearchComponent extends BaseResourceListV2Component<
  Usuario,
  UsuarioFilter
> {
  filtro = new UsuarioFilter();

  textoInativar = "Deseja realmente inativar este registro?";
  textoAtivar = "Deseja realmente ativar este registro?";
  ST_ATIVO = "SIM";

  totalRegistro = 0;
  readonly ITENS_POR_PAGINA = environment.itensPorPagina;

  constructor(usuarioService: UsuarioService, injector: Injector) {
    super(injector, usuarioService);
    this.cleanForm();
  }

  incluir() {
    const urlBase = "usuarios/cadastrar";
    this.router.navigate([urlBase]);
  }

  cleanForm() {
    this.filtro = new UsuarioFilter();
  }

  onLoadList() {
    this.coluna = "id";
    this.direction = 0;
    this.sort = new Sort(this.coluna, this.direction);
  }

  callDialogAtivar(textoConfirmacao: string, param: any) {
    this.confirmationService.confirm({
      acceptLabel: "Sim",
      rejectLabel: "Não",
      header: "Confirmação",
      message: textoConfirmacao,
      accept: () => {
        this.activate(param);
      },
    });
  }
}
