import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FiltroProdutoDTO } from "../model/filter/filtroProdutoDTO";

@Component({
  selector: "app-produtos-search-filter",
  templateUrl: "./produtos-search-filter.component.html",
  styleUrls: ["./produtos-search-filter.component.css"],
})
export class ProdutosSearchFilterComponent implements OnInit {
  @Input()
  filtro: any;

  @Input()
  categorias: any;

  @Output()
  aoPesquisar = new EventEmitter();

  constructor() {}

  pesquisar(form: FormControl) {
    console.log(form.value);
    this.aoPesquisar.emit();
  }

  ngOnInit(): void {}
}
