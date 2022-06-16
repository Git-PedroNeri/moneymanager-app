import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-contabilidade",
  templateUrl: "./contabilidade.component.html",
  styleUrls: ["./contabilidade.component.css"],
})
export class ContabilidadeComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  idContabilidade: any;
  ngOnInit(): void {
    this.idContabilidade=this.activatedRoute.snapshot.params["token"];
  }
}
