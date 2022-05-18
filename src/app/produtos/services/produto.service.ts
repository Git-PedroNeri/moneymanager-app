import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import * as moment from "moment";
import { FiltroProdutoDTO } from "../model/filter/filtroProdutoDTO";

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

    if (filtro.dtInicioCriacao) {
      params = params.set(
        "dtInicioCriacao",
        moment(filtro.dtInicioCriacao).format("YYYY-MM-DD")
      );
    }

    if (filtro.dtFimCriacao) {
      params = params.set(
        "dtCriacao",
        moment(filtro.dtFimCriacao).format("YYYY-MM-DD")
      );
    }

    return this.http
      .get(`${this.produtosUrl}?resumo`, { params })
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
}
