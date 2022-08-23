import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MessageService,
  SortEvent,
  LazyLoadEvent,
  ConfirmationService,
} from "primeng/api";
import { Table } from "primeng/table";
import { take } from "rxjs/operators";

import { environment } from "environments/environment";
import { BaseResourceModel } from "./base-resource.model";
import { BaseResourceService } from "./base-resource.service";
import { FiltroParams } from "../filtroParams";
import { Sort } from "../sort";
import { BaseFiltroModel } from "./base-filtro.model";
import { StoreFilterService } from "../storeFilterService";
@Component({
  template: "",
})
export abstract class BaseResourceListV2Component<
  T extends BaseResourceModel,
  F extends BaseFiltroModel
> implements OnInit
{
  public debug: boolean = false;
  resources: T[] = [];
  public filtro: F;
  protected filtroPequisado: F;
  private isButtonPesquisa: boolean = true;
  protected store: StoreFilterService;
  private searchWithMessage: boolean = true;
  confirmationService: ConfirmationService;
  protected coluna: string;
  protected direction = 0;
  protected sort: Sort;
  totalRegistro = 0;
  protected paginaAtual = 0;
  protected tabelaNumPrimeiraPagina = 0;

  protected route: ActivatedRoute;
  protected router: Router;

  protected messageService: MessageService;
  readonly ITENS_POR_PAGINA = environment.itensPorPagina;

  @ViewChild(Table) table: Table;

  protected constructor(
    protected injector: Injector,
    private resourceService: BaseResourceService<T>
  ) {
    this.route = injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.messageService = injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);
    this.store = this.injector.get(StoreFilterService);
  }

  public page() {
    this.store.store(
      this.filtro,
      this.sort,
      this.router.routerState.snapshot.url
    );
    const urlBase: string = this.router.routerState.snapshot.url + "/cadastrar";
    this.router.navigate([urlBase]);
  }

  public editar(id: any) {
    this.store.store(
      this.filtro,
      this.sort,
      this.router.routerState.snapshot.url
    );
    const urlBase: string =
      this.router.routerState.snapshot.url + "/" + id + "/editar";
    this.router.navigate([urlBase]);
  }

  public detalhar(id: any) {
    this.store.store(
      this.filtro,
      this.sort,
      this.router.routerState.snapshot.url
    );
    const urlBase: string =
      this.router.routerState.snapshot.url + "/" + id + "/detalhar";
    this.router.navigate([urlBase]);
  }

  public pesquisa(event?: LazyLoadEvent) {
    if (this.table) {
      this.table.first = 0;
    }
    this.onLoadList();
    this.paginaAtual = 0;
    this.isButtonPesquisa = true;
    this.store.adicionarFiltroPesquisa(this.filtro);
    this.search(event);
  }

  ngOnInit() {
    this.store.clearByContexto(this.router.routerState.snapshot.url);
    if (this.store.getFiltro() != undefined) {
      this.filtro = <F>this.store.getFiltro();
      this.sort = this.store.getSort();
      this.searchWithMessage = false;
    }
    this.onLoadList();
    this.pesquisa();
  }

  search(event?: LazyLoadEvent) {
    if (event) {
      this.paginaAtual = event.first / event.rows;
    }
    let filtro: BaseFiltroModel = null;
    if (this.isButtonPesquisa) {
      filtro = this.store.getFiltroPesquisa();
    } else {
      filtro = this.filtro;
    }
    this.resourceService
      .searchPageable(
        filtro,
        new FiltroParams(this.paginaAtual.toString(), this.sort).params
      )
      .pipe(take(1))
      .subscribe((resultado) => {
        this.resources = [];
        this.resources = resultado.content;
        this.totalRegistro = resultado.totalElements;
        if (resultado.totalElements === 0 && this.searchWithMessage) {
          this.messageService.add({
            key: "default_notification",
            life: environment.timoutMensagem,
            severity: "info",
            summary: "Mensagem",
            detail: "Nenhum registro encontrado.",
          });
        }
        this.searchWithMessage = true;
        this.isButtonPesquisa = false;
      });
  }

  protected actionsForSuccess() {
    this.messageService.add({
      key: "default_notification",
      life: environment.timoutMensagem,
      severity: "success",
      summary: "Mensagem",
      detail: "Ação realizada com sucesso!",
    });
  }

  protected actionsForDelete() {
    this.messageService.add({
      key: "default_notification",
      life: environment.timoutMensagem,
      severity: "success",
      summary: "Mensagem",
      detail: "Exclusão realizada com sucesso!",
    });
  }

  callDialog(textoConfirmacao: string, param: any) {
    this.confirmationService.confirm({
      acceptLabel: "Sim",
      rejectLabel: "Não",
      header: "Confirmação",
      message: textoConfirmacao,
      accept: () => {
        this.inactivate(param);
      },
    });
  }

  callDialogDelete(textoConfirmacao: string, param: any) {
    this.confirmationService.confirm({
      acceptLabel: "Sim",
      rejectLabel: "Não",
      header: "Confirmação",
      message: textoConfirmacao,
      accept: () => {
        this.delete(param);
      },
    });
  }

  callDialogInativar(textoConfirmacao: string, param: any) {
    this.confirmationService.confirm({
      acceptLabel: "Sim",
      rejectLabel: "Não",
      header: "Confirmação",
      message: textoConfirmacao,
      accept: () => {
        this.inactivate(param);
      },
    });
  }

  inactivate(resource: T) {
    this.resourceService.inativar(resource).subscribe(() => {
      this.searchWithMessage = false;
      this.isButtonPesquisa = true;
      this.actionsForSuccess();
      this.search();
    });
  }

  activate(resource: T) {
    this.resourceService.ativar(resource).subscribe(() => {
      this.searchWithMessage = false;
      this.isButtonPesquisa = true;
      this.actionsForSuccess();
      this.search();
    });
  }

  delete(resource: T) {
    this.resourceService.delete(resource.id).subscribe(() => {
      this.searchWithMessage = false;
      this.isButtonPesquisa = true;
      this.actionsForDelete();
      this.search();
    });
  }

  changePage(event: any) {
    if (this.resources.length > 0) {
      this.isButtonPesquisa = true;
      this.search(event);
    }
  }

  public abstract onLoadList();

  public abstract cleanForm();

  goBack() {
    window.history.back();
  }

  gerarCsv(nomeDocumento: string) {
    this.resourceService
      .gerarCsv(this.filtro, nomeDocumento)
      .subscribe((response) => {
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "text/csv" })
        );
        downloadLink.setAttribute("download", nomeDocumento + ".csv");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  gerarExcel(nomeDocumento: string) {
    this.resourceService
      .gerarExcel(this.filtro, nomeDocumento)
      .subscribe((response) => {
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        downloadLink.setAttribute("download", nomeDocumento + ".xls");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  gerarPdf(nomeDocumento: string) {
    this.resourceService
      .gerarPdf(this.filtro, nomeDocumento)
      .subscribe((response) => {
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/pdf" })
        );
        downloadLink.setAttribute("download", nomeDocumento + ".pdf");
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  visualizar(nomeDocumento: string) {
    this.resourceService.visualizar(this.filtro, nomeDocumento);
  }

  public onSortList(evento: SortEvent) {
    if (this.resources.length > 0) {
      this.isButtonPesquisa = true;
      this.coluna = evento.field;
      this.direction = evento.order;
      this.sort = new Sort(this.coluna, this.direction);
      this.search();
    }
  }
}
