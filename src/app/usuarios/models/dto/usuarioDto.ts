import { Perfil } from "app/perfis/models/Perfil";
import { BaseResourceModel } from "app/shared/abstract/base-resource.model";

export class UsuarioDto extends BaseResourceModel {
  public email: string;
  public nome: string;
  public senha: string;
  public perfis: Perfil[];
  pagina = 0;
  itensPorPagina: number;

  constructor(id?: number) {
    super();
    this.id = id;
  }

  static fromJson(jsonData: any): UsuarioDto {
    return Object.assign(new UsuarioDto(), jsonData);
  }
}
