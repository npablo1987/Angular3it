import { Component, OnInit, ViewChild } from '@angular/core';
import { EncuestasService } from '../services/encuestas.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  public resultado: Array<any> = [];
  public etiquetas: Array<any> = [];
  public datagasa: Array<any> = [];

  constructor(private encuestaService: EncuestasService) {}

  ngOnInit(): void {
    this.encuestaService.getEncuestas().subscribe((resp: any) => {
      this.resultado = resp;
      this.resultado.forEach((datosgs) => {
        this.datagasa.push(datosgs['0']);
        this.etiquetas.push(datosgs['1']);
      });
      console.log(this.etiquetas);
      console.log(this.datagasa);
    });
    this.chart?.update();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [ChartDataLabels];

  public barChartData: ChartData<'bar'> = {
    labels: this.etiquetas,
    datasets: [
      {
        data: this.datagasa,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'black',
      },
    ],
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        border: {
          color: 'black',
          width: 2,
        },
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grace: '70%',
        border: {
          color: 'black',
          width: 2,
        },
        grid: { display: false },
        ticks: { display: false },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: { display: false },

      datalabels: {
        anchor: 'end',
        display: true,
        align: 'end',
        color: '#000000',
        rotation: -90,
        font: { size: 18, weight: 'bold' },
        formatter: (val, context) => {
          return this.etiquetas[context.dataIndex];
        },
      },
    },
  };

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}
  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    this.chart?.update();
  }
  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
function myMethod(): any {
  throw new Error('Function not implemented.');
}
