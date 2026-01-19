import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { TipoReceita } from '../../models';
import { RevenueTypeDialogComponent } from '../revenue-type-dialog/revenue-type-dialog.component';

@Component({
  selector: 'app-revenue-types',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './revenue-types.component.html',
  styleUrl: './revenue-types.component.scss'
})
export class RevenueTypesComponent implements OnInit {
  revenueTypes: TipoReceita[] = [];
  displayedColumns: string[] = ['cor', 'nome', 'actions'];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.api.getTiposReceita().subscribe(data => this.revenueTypes = data);
  }

  openDialog(item?: TipoReceita) {
    const dialogRef = this.dialog.open(RevenueTypeDialogComponent, {
      width: '500px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.snackBar.open('Tipo de receita salvo!', 'Fechar', { duration: 3000 });
      }
    });
  }

  delete(item: TipoReceita) {
    if (confirm(`Excluir ${item.nome}?`)) {
      this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', { duration: 3000 });
    }
  }
}
