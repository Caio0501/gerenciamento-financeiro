import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { CategoriaGasto } from '../../models';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: CategoriaGasto[] = [];
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
    this.api.getCategorias().subscribe(data => this.categories = data);
  }

  openDialog(item?: CategoriaGasto) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '500px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.snackBar.open('Categoria salva!', 'Fechar', { duration: 3000 });
      }
    });
  }

  delete(item: CategoriaGasto) {
    if (confirm(`Excluir ${item.nome}?`)) {
      this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', { duration: 3000 });
    }
  }
}
