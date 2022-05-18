import { HttpParams } from "@angular/common/http";
import { environment } from "environments/environment";
import { Sort } from "./sort";

export class FiltroParams {
  readonly ITENS_POR_PAGINA = environment.itensPorPagina;
  public params: HttpParams;

  constructor(pagina: string, sort: Sort) {
    this.params = new HttpParams()
      .append("page", pagina)
      .append("size", this.ITENS_POR_PAGINA.toString())
      .append("sort", sort.toString());
  }
}
