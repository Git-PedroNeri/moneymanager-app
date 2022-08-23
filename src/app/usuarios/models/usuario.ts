import { Perfil } from "app/perfis/models/Perfil";
import { BaseEntity } from "app/shared/filters/base.entity";

export class Usuario implements BaseEntity {
  public id: any;
  public nome: string;
  public email: string;
  public senha: string;
  public perfis: Perfil[];

  public situacao: string;

  constructor() {
    this.perfis = [];
  }

  static fromJson(jsonData: any): Usuario {
    return Object.assign(new Usuario(), jsonData);
  }
}
