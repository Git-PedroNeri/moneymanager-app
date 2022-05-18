import { Injectable } from "@angular/core";
import { BaseFiltroModel } from "./abstract/base-filtro.model";
import { Sort } from "./sort";

@Injectable({ providedIn: "root" })
export class StoreFilterService {
  private filtro: BaseFiltroModel;
  private filtroPesquisa: BaseFiltroModel;
  protected sort: Sort;
  private contexto: string;

  store(filtro: BaseFiltroModel, sort: Sort, contexto: string) {
    this.filtro = filtro;
    this.sort = sort;
    this.contexto = contexto;
  }

  adicionarFiltroPesquisa(filtroPesquisa: BaseFiltroModel) {
    this.filtroPesquisa = JSON.parse(JSON.stringify(filtroPesquisa));
  }

  clearStore() {
    this.filtro = null;
    this.sort = null;
    this.contexto = null;
  }

  getFiltro(): BaseFiltroModel {
    return this.filtro;
  }

  getFiltroPesquisa() {
    return this.filtroPesquisa;
  }

  getSort(): Sort {
    return this.sort;
  }

  getContexto(): string {
    return this.contexto;
  }

  clearByContexto(contexto: string) {
    if (this.getContexto() !== contexto) {
      this.clearStore();
    }
  }
}
