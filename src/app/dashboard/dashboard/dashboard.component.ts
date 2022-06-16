import { Component, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { DashboardService } from "./../dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  pieChartData: any;
  lineChartData: any;
  lineChartDataProduto: any;
  lineChartDataDefault: any;
  pieChartDataDefault: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? dataset.label + ": " : "";

          return label + this.decimalPipe.transform(valor, "1.2-2");
        },
      },
    },
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.configurarGraficoPizzaLancamentos();
    this.configurarGraficoLinhaLancamentos();
    this.configurarGraficoLinhaDefault();
    this.configurarGraficoPieDefault();
    this.configurarGraficoLinhaProduto();
  }

  configurarGraficoPieDefault() {
    this.pieChartDataDefault = {
      labels: ["Mensal", "Educação", "Lazer", "Imprevistos"],
      datasets: [
        {
          data: [2500, 2700, 550, 235],
          backgroundColor: ["#FF9900", "#109618", "#990099", "#3B3EAC"],
        },
      ],
    };
  }

  configurarGraficoLinhaDefault() {
    this.lineChartDataDefault = {
      labels: [
        "Domingo",
        "Segunda",
        "Terca",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sabado",
      ],
      datasets: [
        {
          label: "Receitas",
          data: [4, 10, 18, 5, 1, 20, 3],
          borderColor: "#3366CC",
        },
        {
          label: "Despesas",
          data: [10, 15, 8, 5, 1, 7, 9],
          borderColor: "#D62B00",
        },
      ],
    };
  }

  configurarGraficoPizzaLancamentos() {
    this.dashboardService.lancamentosPorCategoria().then((dados) => {
      this.pieChartData = {
        labels: dados.map((dado) => dado.categoria.nome),
        datasets: [
          {
            data: dados.map((dado) => dado.total),
            backgroundColor: [
              "#FF9900",
              "#109618",
              "#990099",
              "#3B3EAC",
              "#0099C6",
              "#DD4477",
              "#3366CC",
              "#DC3912",
            ],
          },
        ],
      };
    });
  }

  configurarGraficoLinhaLancamentos() {
    this.dashboardService.lancamentosPorDia().then((dados) => {
      const diasDoMes = this.configurarDiasMes();
      const totaisReceitas = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.tipo === "RECEITA"),
        diasDoMes
      );
      const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.tipo === "DESPESA"),
        diasDoMes
      );

      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: "Receitas",
            data: totaisReceitas,
            borderColor: "#3366CC",
          },
          {
            label: "Despesas",
            data: totaisDespesas,
            borderColor: "#D62B00",
          },
        ],
      };
    });
  }
  configurarGraficoLinhaProduto() {
    this.dashboardService.produtosPorDia().then((dados) => {
      const diasDoMes = this.configurarDiasMes();
      const totaisEletronicos = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.categoriaProduto.nome === "ELETRÔNICOS"),
        diasDoMes
      );
      const totaisAlimentacao = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.categoriaProduto.nome === "ALIMENTAÇÃO"),
        diasDoMes
      );
      const totaisHigiene = this.totaisPorCadaDiaMes(
        dados.filter((dado) => dado.categoriaProduto.nome === "HIGIENE"),
        diasDoMes
      );

      this.lineChartDataProduto = {
        labels: diasDoMes,
        datasets: [
          {
            label: "Eletrônicos",
            data: totaisEletronicos,
            borderColor: "#3366CC",
          },
          {
            label: "Alimentação",
            data: totaisAlimentacao,
            borderColor: "#D62B00",
          },
          {
            label: "Higiene",
            data: totaisHigiene,
            borderColor: "#D62B00",
          },
        ],
      };
    });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }
}
