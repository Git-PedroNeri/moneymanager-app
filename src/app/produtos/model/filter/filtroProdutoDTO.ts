import { CategoriaProduto } from 'app/core/model';
import { BaseFiltroModel } from "app/shared/abstract/base-filtro.model";

export class FiltroProdutoDTO extends BaseFiltroModel {
  public id?: string | number;
  nome: string;
  descricao: string;
  categoriaProduto:CategoriaProduto;
  categoriaProdutoId:any
  preco: any;
  dtCadastroFim: Date;
  dtCadastroInicio: Date;
  paisCode: string;
  pagina = 0;
}
