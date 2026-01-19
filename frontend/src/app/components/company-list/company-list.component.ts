import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Empresa } from '../../models';
import { CompanyDialogComponent } from '../company-dialog/company-dialog.component';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {
  companies: Empresa[] = [];
  displayedColumns: string[] = ['nome', 'descricao', 'dataCriacao', 'status', 'actions'];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.api.getEmpresas().subscribe(data => this.companies = data);
  }

  openDialog(empresa?: Empresa) {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      width: '400px',
      data: { empresa }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCompanies();
        this.snackBar.open('Empresa salva com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }

  deleteCompany(empresa: Empresa) {
    if (confirm(`Tem certeza que deseja excluir ${empresa.nome}?`)) {
      if (empresa.id) {
        this.api.deleteEmpresa(empresa.id).subscribe(() => {
          this.loadCompanies();
          this.snackBar.open('Empresa excluída.', 'Fechar', { duration: 3000 });
        });
      }
    }
  }
}
