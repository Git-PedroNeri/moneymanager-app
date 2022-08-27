import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Transferencia } from "../models/transferencia.model";
import { TransferenciaService } from "../transferencia.service";

@Component({
  selector: "app-transferencia",
  templateUrl: "./transferencia.component.html",
  styleUrls: ["./transferencia.component.css"],
})
export class TransferenciaComponent implements OnInit {
  transferencias: Transferencia[] = [];
  constructor(private transferenciaService: TransferenciaService) {}

  ngOnInit(): void {
    this.transferenciaService.buscarTransfrencias().subscribe((t) => {
      this.transferencias = t;
    });
  }

  transferencia($event) {
    const transferencia = { ...$event, data: new Date() };
    this.transferencias.push(transferencia);
  }
}
