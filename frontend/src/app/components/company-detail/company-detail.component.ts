import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Gasto, Receita } from '../../models';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { RevenueDialogComponent } from '../revenue-dialog/revenue-dialog.component';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent implements OnInit {
  companyId!: string;
  expenses: Gasto[] = [];
  revenues: Receita[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
      this.loadData();
    });
  }

  loadData() {
    this.api.getGastos(this.companyId).subscribe(data => this.expenses = data);
    this.api.getReceitas(this.companyId).subscribe(data => this.revenues = data);
  }

  openExpenseDialog() {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '400px',
      data: { companyId: this.companyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  openRevenueDialog() {
    const dialogRef = this.dialog.open(RevenueDialogComponent, {
      width: '400px',
      data: { companyId: this.companyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
}
