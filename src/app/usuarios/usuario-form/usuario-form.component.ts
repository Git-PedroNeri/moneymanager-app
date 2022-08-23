import { Component, Injector, OnInit } from "@angular/core";
import { Perfil } from "app/perfis/models/Perfil";
import { PerfisService } from "app/perfis/perfis.service";
import { BaseResourceFormV2Component } from "app/shared/abstract/base-resource-formv2.component";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../usuario.service";

@Component({
  selector: "app-usuario-form",
  templateUrl: "./usuario-form.component.html",
  styleUrls: ["./usuario-form.component.css"],
})
export class UsuarioFormComponent extends BaseResourceFormV2Component<Usuario> {
  protected montarTitulo() {
    throw new Error("Method not implemented.");
  }

  perfis: Perfil[];
  titulo: string = "Cadastrar Usuário";

  constructor(
    private perfilService: PerfisService,
    private usuarioService: UsuarioService,
    injector: Injector
  ) {
    super(injector, new Usuario(), usuarioService);
    this.cleanForm();
  }

  cleanForm() {

  }

 ngOnInit() {
    super.ngOnInit();
    this.loadPerfis();
  }

  loadPerfis() {
    this.perfis = [];
    this.perfilService.buscarPerfis().subscribe((perfis) => {
      this.perfis = perfis;
      if (this.resource != null) {
        for (const perfil of this.resource.perfis) {
          this.perfis = this.perfis.filter((obj) => obj.id !== perfil.id);
        }
      }
    });
  }



  voltar() {
    this.goBack();
  }

  // onBlurCPF() {
  //   // tslint:disable-next-line:triple-equals
  //   if (this.resource.cpf.length != 11) {
  //     this.resource.cpf = null;
  //   }
  // }

  // onBlurTelefone($event) {
  //   // tslint:disable-next-line:triple-equals
  //   if (this.resource.telefone.length != 14) {
  //     this.resource.telefone = null;
  //   }
  // }
}
