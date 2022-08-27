import { Component, Input, OnInit } from "@angular/core";
import { Transferencia } from "app/transferencia/models/transferencia.model";

@Component({
  selector: "app-historico-transacoes",
  templateUrl: "./historico-transacoes.component.html",
  styleUrls: ["./historico-transacoes.component.css"],
})
export class HistoricoTransacoesComponent implements OnInit {
  @Input() transferencias: Transferencia[];

  constructor() {}

  ngOnInit(): void {}
}
