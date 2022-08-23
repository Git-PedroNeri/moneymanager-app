import { BaseFiltroModel } from "app/shared/abstract/base-filtro.model";

export class PerfilFilter extends BaseFiltroModel {
  public descricao: string;
  public ativo: string;
  pagina = 0;
  itensPorPagina: number;
}
