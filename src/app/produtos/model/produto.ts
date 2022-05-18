import { CategoriaProduto } from "app/core/model";

export class Produto {
  id?: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  dataCadastro: Date;
  categoriaProduto = new CategoriaProduto();
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

