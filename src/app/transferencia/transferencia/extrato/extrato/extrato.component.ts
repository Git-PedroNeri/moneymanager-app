import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-extrato",
  templateUrl: "./extrato.component.html",
  styleUrls: ["./extrato.component.css"],
})
export class ExtratoComponent implements OnInit {
  @Output() aoTransferir = new EventEmitter<any>();

  valor: number;
  destino: number;

  transferencias: any[];

  constructor() {}

  ngOnInit(): void {}

  transferir(transferenciaForm: FormControl) {
    console.log("Realizando Transferência");
    this.aoTransferir.emit(transferenciaForm);
  }
}
