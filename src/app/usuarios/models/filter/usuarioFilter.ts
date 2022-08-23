import { BaseFiltroModel } from "app/shared/abstract/base-filtro.model";

export class UsuarioFilter extends BaseFiltroModel {
  public email: string;
  public nome: string;
  public situacao: string;
  pagina = 0;
  itensPorPagina: number;
}
