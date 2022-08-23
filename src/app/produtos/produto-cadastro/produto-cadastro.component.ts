import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorHandlerService } from "app/core/error-handler.service";
import { CategoriaProduto, Pais } from "app/core/model";
import { ConvertUtil } from "app/shared/converts/convert-util";
import { MessageService, SelectItem } from "primeng/api";
import { ProdutoService } from "../services/produto.service";

@Component({
  selector: "app-produto-cadastro",
  templateUrl: "./produto-cadastro.component.html",
  styleUrls: ["./produto-cadastro.component.css"],
})
export class ProdutoCadastroComponent implements OnInit {
  countries: Pais[];
  categorias: CategoriaProduto[];

  editando: boolean;

  formulario: any;

  selectedPais: Pais;
  countriesSelectItem: SelectItem[];
  categoriaProdutoSelectItem: SelectItem[];
  produtoForm: FormGroup;

  totalValorProjeto = 30000;

  constructor(
    private title: Title,
    private errorHandler: ErrorHandlerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categorias = [
      { id: 1, nome: "HIGIENE" },
      { id: 2, nome: "ALIMENTAÇÃO" },
      { id: 3, nome: "ELETRÔNICOS" },
    ];

    this.countries = [
      { name: "Australia", code: "AU" },
      { name: "Brazil", code: "BR" },
      { name: "China", code: "CN" },
      { name: "Egypt", code: "EG" },
      { name: "France", code: "FR" },
      { name: "Germany", code: "DE" },
      { name: "India", code: "IN" },
      { name: "Japan", code: "JP" },
      { name: "Spain", code: "ES" },
      { name: "United States", code: "US" },
    ];

    this.categoriaProdutoSelectItem = ConvertUtil.converterParaDropDown(
      this.categorias,
      "nome",
      "id",
      "Selecione"
    );

    this.countriesSelectItem = ConvertUtil.converterParaDropDown(
      this.countries,
      "name",
      "code",
      "Selecione"
    );
  }

  ngOnInit() {
    this.title.setTitle("Novo lançamento");
    // this.loadCategoriaProduto();
    this.initForm();

    const produtoId = this.route.snapshot.params["id"];

    if (produtoId) {
      this.editando = true;
      this.loadProduto(produtoId);
      this.title.setTitle("Editar lançamento");
      console.log(this.produtoForm.value);
    }
  }

  loadProduto(id: number) {
    this.produtoService
      .busrcarPorId(id)
      .then((produto) => {
        this.produtoForm.patchValue(produto);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  showError() {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
    });
  }

  deveComecarComA(form: FormControl) {
    if (form.value != null) {
      return form.value.toLowerCase().startsWith("A".toLowerCase())
        ? false
        : { notStartsWithA: true };
    }
    return null;
  }

  devePossuirMinimoDe(n: number) {
    return (input: FormControl) => {
      return !input.value || input.value.length >= n
        ? null
        : { tamanhoMinimo: { tamanho: n } };
    };
  }

  validarDisponibilidadeFinanceira(teto: number) {
    return (input: FormControl) => {
      return !input.value || input.value < teto
        ? false
        : { disponibilidadeFinanceira: true };
    };
  }

  initForm() {
    this.produtoForm = this.fb.group({
      id: [],
      descricao: [null, [Validators.required, Validators.minLength(10)]],
      nome: [
        null,
        [
          Validators.required,
          this.deveComecarComA,
          this.devePossuirMinimoDe(10),
        ],
      ],
      preco: [
        null,
        [
          Validators.required,
          this.validarDisponibilidadeFinanceira(this.totalValorProjeto),
        ],
      ],
      pais: this.fb.group({
        name: [null],
        code: [null, Validators.required],
      }),
      categoriaProduto: this.fb.group({
        id: [null, Validators.required],
        nome: [],
      }),
    });

    console.log(this.produtoForm);
  }

  salvar() {
    if (this.editando) {
      this.atualizarProduto();
    } else {
      this.adicionarProduto();
    }
  }

  adicionarProduto() {
    this.produtoService
      .cadastrar(this.produtoForm.value)
      .then((produtoAdicionado) => {
        this.messageService.add({
          severity: "success",
          detail: "Produto adicionado com sucesso!",
        });

        // form.reset();
        // this.lancamento = new Lancamento();
        // this.router.navigate(["/produtos"]);

        //Exemplo caso queria após salvar um novo produto eu possa ir para a edição seria :
        this.router.navigate(["/produtos", produtoAdicionado.id, "editar"]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  atualizarProduto() {
    this.produtoService
      .atualizar(this.produtoForm.value)
      .then((produtoAdicionado) => {
        this.messageService.add({
          severity: "success",
          detail: "Produto adicionado com sucesso!",
        });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(["/produtos"]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
