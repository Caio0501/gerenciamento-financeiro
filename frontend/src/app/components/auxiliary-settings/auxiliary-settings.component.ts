import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { CategoriaGasto, FormaPagamento, TipoReceita } from '../../models';

@Component({
  selector: 'app-auxiliary-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './auxiliary-settings.component.html',
  styleUrl: './auxiliary-settings.component.scss'
})
export class AuxiliarySettingsComponent implements OnInit {
  categorias: CategoriaGasto[] = [];
  formasPagamento: FormaPagamento[] = [];
  tiposReceita: TipoReceita[] = [];

  newCategoria = '';
  newFormaPagamento = '';
  newTipoReceita = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.refreshAll();
  }

  refreshAll() {
    this.api.getCategorias().subscribe(data => this.categorias = data);
    this.api.getFormasPagamento().subscribe(data => this.formasPagamento = data);
    this.api.getTiposReceita().subscribe(data => this.tiposReceita = data);
  }

  addCategoria() {
    if (this.newCategoria.trim()) {
      this.api.createCategoria({ nome: this.newCategoria }).subscribe(() => {
        this.newCategoria = '';
        this.refreshAll(); // Simple refresh
      });
    }
  }

  addFormaPagamento() {
    if (this.newFormaPagamento.trim()) {
      this.api.createFormaPagamento({ nome: this.newFormaPagamento }).subscribe(() => {
        this.newFormaPagamento = '';
        this.refreshAll();
      });
    }
  }

  addTipoReceita() {
    if (this.newTipoReceita.trim()) {
      this.api.createTipoReceita({ nome: this.newTipoReceita }).subscribe(() => {
        this.newTipoReceita = '';
        this.refreshAll();
      });
    }
  }
}
