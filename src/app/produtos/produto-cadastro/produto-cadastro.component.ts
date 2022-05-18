import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Country } from "app/core/model";
import { ConvertUtil } from "app/shared/converts/convert-util";
import { MessageService, SelectItem } from "primeng/api";

@Component({
  selector: "app-produto-cadastro",
  templateUrl: "./produto-cadastro.component.html",
  styleUrls: ["./produto-cadastro.component.css"],
})
export class ProdutoCadastroComponent implements OnInit {
  countries: Country[];

  selectedCountry: Country;
  countriesSelectItem: SelectItem[];
  categoriaProdutoSelectItem: SelectItem[];
  produtoForm: FormGroup;

  totalValorProjeto = 1000;

  categorias = [
    { id: 1, nome: "HIGIENE" },
    { id: 2, nome: "ALIMENTAÇÃO" },
    { id: 3, nome: "ELETRÔNICOS" },
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
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
    // this.loadCategoriaProduto();
    this.initForm();
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
      console.log(input.value);
      return !input.value || input.value < teto
        ? false
        : { disponibilidadeFinanceira: true };
    };
  }

  initForm() {
    this.produtoForm = this.fb.group({
      descricao: [null, [Validators.required, Validators.minLength(10)]],
      nome: [
        null,
        [
          Validators.required,
          this.deveComecarComA,
          this.devePossuirMinimoDe(10),
        ],
      ],
      valor: [
        null,
        [
          Validators.required,
          this.validarDisponibilidadeFinanceira(this.totalValorProjeto),
        ],
      ],
      country: this.fb.group({
        name: [null],
        code: [null, Validators.required],
      }),
      categoriaProduto: this.fb.group({
        categoriaProdutoId: [null, Validators.required],
        nome: [],
      }),
      observacao: [],
      anexo: [],
      urlAnexo: [],
    });
  }

  cadastrar(form: any) {
    this.showError();
    console.log(form);
  }
}
