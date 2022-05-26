import { HttpClient } from "@angular/common/http";
import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ErrorHandlerService } from "app/core/error-handler.service";
import { AuthService } from "app/seguranca/auth.service";
import { ConvertUtil } from "app/shared/converts/convert-util";
import { environment } from "environments/environment";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
  SelectItem,
} from "primeng/api";
import { Table } from "primeng/table";
import { FiltroProdutoDTO } from "../model/filter/filtroProdutoDTO";
import { ProdutoService } from "../services/produto.service";

@Component({
  selector: "app-produtos-pesquisa",
  templateUrl: "./produtos-pesquisa.component.html",
  styleUrls: ["./produtos-pesquisa.component.css"],
})
export class ProdutosPesquisaComponent implements OnInit {
  categorias = [
    { id: 1, nome: "HIGIENE" },
    { id: 2, nome: "ALIMENTAÇÃO" },
    { id: 3, nome: "ELETRÔNICOS" },
    { id: 4, nome: "ROUPAS" },
    { id: 5, nome: "ACESSORIOS" },
  ];

  categoriProdutoSelectItem: SelectItem[] = [];
  totalRegistros = 0;
  produtos = [];
  readonly ITENS_POR_PAGINA = environment.itensPorPagina;
  filtro = new FiltroProdutoDTO();
  @ViewChild("tabela") grid: Table;

  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    protected injector: Injector,
    private produtoService: ProdutoService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {
    this.categoriProdutoSelectItem = ConvertUtil.converterParaDropDown(
      this.categorias,
      "nome",
      "id",
      "Selecione"
    );
  }

  public cleanForm() {
    this.filtro = new FiltroProdutoDTO();
  }

  ngOnInit(): void {
    this.title.setTitle("Pesquisa de Produto");
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.produtoService
      .pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.produtos = resultado.produtos;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir?",
      accept: () => {
        this.excluir(produto);
      },
    });
  }
  excluir(produto: any) {
    this.produtoService
      .remover(produto.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({
          severity: "success",
          detail: "Produto excluído com sucesso!",
        });
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
