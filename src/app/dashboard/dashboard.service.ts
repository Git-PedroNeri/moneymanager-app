import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as moment from "moment";

import { environment } from "./../../environments/environment";

@Injectable()
export class DashboardService {
  lancamentosUrl: string;
  produtosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    this.produtosUrl = `${environment.apiUrl}/produtos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http
      .get<any>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise();
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http
      .get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then((response) => {
        this.converterStringsParaDatas(response);

        return response;
      });
  }
  produtosPorDia(): Promise<Array<any>> {
    return this.http
      .get<Array<any>>(`${this.produtosUrl}/report/by-dia`)
      .toPromise()
      .then((response) => {
        this.converterStringsParaDatas(response);

        return response;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, "YYYY-MM-DD").toDate();
    }
  }
}
