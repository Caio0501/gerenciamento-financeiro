import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';
import { Receita, Empresa } from '../../models';
import { RevenueDialogComponent } from '../revenue-dialog/revenue-dialog.component';

@Component({
  selector: 'app-revenues',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './revenues.component.html',
  styleUrl: './revenues.component.scss'
})
export class RevenuesComponent implements OnInit {
  revenues: Receita[] = [];
  displayedColumns: string[] = ['data', 'descricao', 'tipo', 'formaPagamento', 'valor', 'actions'];
  selectedCompany: Empresa | null = null;

  constructor(
    private api: ApiService,
    private state: StateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.state.selectedCompany$.subscribe(company => {
      this.selectedCompany = company;
      if (company?.id) {
        this.loadData();
      } else {
        this.revenues = [];
      }
    });
  }

  loadData() {
    if (this.selectedCompany?.id) {
      this.api.getReceitas(this.selectedCompany.id).subscribe(data => {
        this.revenues = data;
      });
    }
  }

  openDialog(revenue?: Receita) {
    if (!this.selectedCompany) {
      this.snackBar.open('Selecione uma empresa primeiro', 'Fechar', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(RevenueDialogComponent, {
      width: '600px',
      data: { receita: revenue, empresa: this.selectedCompany }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.snackBar.open('Receita salva!', 'Fechar', { duration: 3000 });
      }
    });
  }

  delete(revenue: Receita) {
    if (confirm(`Excluir receita de ${revenue.valor}?`)) {
      this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', { duration: 3000 });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
