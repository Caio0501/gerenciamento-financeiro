import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';
import { Gasto, Empresa } from '../../models';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  expenses: Gasto[] = [];
  displayedColumns: string[] = ['data', 'descricao', 'categoria', 'formaPagamento', 'valor', 'actions'];
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
        this.expenses = [];
      }
    });
  }

  loadData() {
    if (this.selectedCompany?.id) {
      this.api.getGastos(this.selectedCompany.id).subscribe(data => {
        this.expenses = data;
      });
    }
  }

  openDialog(expense?: Gasto) {
    if (!this.selectedCompany) {
      this.snackBar.open('Selecione uma empresa primeiro', 'Fechar', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '600px',
      data: { gasto: expense, empresa: this.selectedCompany }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.snackBar.open('Gasto salvo!', 'Fechar', { duration: 3000 });
      }
    });
  }

  delete(expense: Gasto) {
    if (confirm(`Excluir gasto de ${expense.valor}?`)) {
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
