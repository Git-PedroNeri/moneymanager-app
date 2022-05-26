import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import * as moment from "moment";
import { FiltroProdutoDTO } from "../model/filter/filtroProdutoDTO";
import { Produto } from "../model/produto";

@Injectable({ providedIn: "root" })
export class ProdutoService {
  produtosUrl: string;

  constructor(private http: HttpClient) {
    this.produtosUrl = `${environment.apiUrl}/produtos`;
  }

  pesquisar(filtro: FiltroProdutoDTO): Promise<any> {
    let params = new HttpParams()
      .set("page", filtro.pagina.toString())
      .set("size", environment.itensPorPagina.toString());
    if (filtro.descricao) {
      params = params.set("descricao", filtro.descricao);
    }
    if (filtro.preco) {
      params = params.set("preco", filtro.preco as string);
    }
    if (filtro.categoriaProdutoId) {
      params = params.set("categoriaProdutoId", filtro.categoriaProdutoId);
    }
    if (filtro.nome) {
      params = params.set("nome", filtro.nome);
    }
    if (filtro.paisCode) {
      params = params.set("paisCode", filtro.paisCode);
    }

    if (filtro.dtCadastroFim) {
      params = params.set(
        "dtCadastroFim",
        moment(filtro.dtCadastroFim).format("YYYY-MM-DD")
      );
    }

    if (filtro.dtCadastroInicio) {
      params = params.set(
        "dtCadastroInicio",
        moment(filtro.dtCadastroInicio).format("YYYY-MM-DD")
      );
    }

    return this.http
      .get(`${this.produtosUrl}`, { params })
      .toPromise()
      .then((response) => {
        const produtos = response["content"];

        const resultado = {
          produtos,
          total: response["totalElements"],
        };

        return resultado;
      });
  }

  remover(codigo: number): Promise<void> {
    return this.http
      .delete(`${this.produtosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  cadastrar(produto: any): Promise<Produto> {
    return this.http.post<Produto>(this.produtosUrl, produto).toPromise();
  }
}
