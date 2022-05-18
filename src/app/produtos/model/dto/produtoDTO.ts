import { BaseResourceModel } from "../../../shared/abstract/base-resource.model";

export class ProdutoDTO extends BaseResourceModel {
  nome: string;
  descricao: string;
  categoriaProdutoNome: string;
  preco: any;
  dtInicioCriacao: Date;
  dtFimCriacao: Date;
  pagina = 0;

  constructor(id?: number) {
    super();
    this.id = id;
  }

  static fromJson(jsonData: any): ProdutoDTO {
    return Object.assign(new ProdutoDTO(), jsonData);
  }
}
