import { BaseEntity } from "app/shared/filters/base.entity";

export class Perfil implements BaseEntity {
  public id: string;
  public descricao: string;

  constructor() {}

  static fromJson(jsonData: any): Perfil {
    return Object.assign(new Perfil(), jsonData);
  }
}
