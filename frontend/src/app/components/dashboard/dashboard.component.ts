import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';
import { Empresa, Gasto, Receita } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgxEchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentCompany: Empresa | null = null;
  
  totalReceitas = 0;
  totalGastos = 0;
  saldo = 0;
  
  recentTransactions: any[] = [];

  // ECharts Option
  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: R$ {c} ({d}%)'
    },
    legend: {
      bottom: '5%',
      left: 'center',
      textStyle: {
        color: '#5f6368'
      }
    },
    series: [
      {
        name: 'Gastos por Categoria',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: []
      }
    ]
  };

  constructor(
    private api: ApiService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.state.selectedCompany$.subscribe(company => {
      this.currentCompany = company;
      if (company && company.id) {
        this.loadData(company.id);
      } else {
        this.resetData();
      }
    });
  }

  resetData() {
    this.totalReceitas = 0;
    this.totalGastos = 0;
    this.saldo = 0;
    this.recentTransactions = [];
    this.updateChart([]);
  }

  loadData(companyId: string) {
    this.api.getGastos(companyId).subscribe(gastos => {
      this.api.getReceitas(companyId).subscribe(receitas => {
        this.processData(gastos, receitas);
      });
    });
  }

  processData(gastos: Gasto[], receitas: Receita[]) {
    // 1. Totals
    this.totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
    this.totalReceitas = receitas.reduce((acc, r) => acc + r.valor, 0);
    this.saldo = this.totalReceitas - this.totalGastos;

    // 2. Recent Transactions
    const gMapped = gastos.map(g => ({
      type: 'expense',
      desc: g.descricao,
      date: g.dataPagamento,
      val: -g.valor,
      category: g.categoria.nome,
      method: g.formaPagamento.nome
    }));
    
    const rMapped = receitas.map(r => ({
      type: 'revenue',
      desc: r.descricao,
      date: r.dataRecebimento,
      val: r.valor,
      category: r.tipoReceita.nome,
      method: r.formaPagamento.nome
    }));

    this.recentTransactions = [...gMapped, ...rMapped]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // 3. Chart Data (Expenses by Category)
    const catMap = new Map<string, number>();
    gastos.forEach(g => {
      const cat = g.categoria.nome;
      const current = catMap.get(cat) || 0;
      catMap.set(cat, current + g.valor);
    });

    const chartData = Array.from(catMap.entries()).map(([name, value]) => ({
      name,
      value
    }));

    this.updateChart(chartData);
  }

  updateChart(data: any[]) {
    const colors = ['#00C853', '#2962FF', '#FF6D00', '#D50000', '#AA00FF', '#00B8D4'];
    
    this.chartOption = {
      ...this.chartOption,
      color: colors,
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };
  }
}
