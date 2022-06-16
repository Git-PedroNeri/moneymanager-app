import { Component, OnInit } from "@angular/core";
import { RelatoriosService } from "../relatorios.service";

@Component({
  selector: "app-relatorios-produto",
  templateUrl: "./relatorios-produto.component.html",
  styleUrls: ["./relatorios-produto.component.css"],
})
export class RelatoriosProdutoComponent implements OnInit {
  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit() {}

  gerar() {
    this.relatoriosService
      .relatorioProdutoPorPais(this.periodoInicio, this.periodoFim)
      .then((relatorio) => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }
}
