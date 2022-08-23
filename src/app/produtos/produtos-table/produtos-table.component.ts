import { ThrowStmt } from "@angular/compiler";
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ErrorHandlerService } from "app/core/error-handler.service";
import { AuthService } from "app/seguranca/auth.service";
import { environment } from "environments/environment";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { Table } from "primeng/table";
import { FiltroProdutoDTO } from "../model/filter/filtroProdutoDTO";
import { Produto } from "../model/produto";
import { ProdutoService } from "../services/produto.service";

@Component({
  selector: "app-produtos-table",
  templateUrl: "./produtos-table.component.html",
  styleUrls: ["./produtos-table.component.css"],
})
export class ProdutosTableComponent implements OnInit {
  @Input()
  produtosList: Array<Produto>;

  filtro = new FiltroProdutoDTO();
  @ViewChild("tabela") grid: Table;

  totalRegistros = 0;
  readonly ITENS_POR_PAGINA = environment.itensPorPagina;

  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    protected injector: Injector,
    private produtoService: ProdutoService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.produtoService
      .pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.produtosList = resultado.produtos;
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
