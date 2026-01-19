import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { TipoReceita, FormaPagamento, Receita, Empresa } from '../../models';

@Component({
  selector: 'app-revenue-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './revenue-dialog.component.html',
  styleUrl: './revenue-dialog.component.scss'
})
export class RevenueDialogComponent implements OnInit {
  form: FormGroup;
  tiposReceita: TipoReceita[] = [];
  formasPagamento: FormaPagamento[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<RevenueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { receita?: Receita; empresa: Empresa }
  ) {
    this.isEdit = !!data?.receita;
    
    this.form = this.fb.group({
      dataRecebimento: [data?.receita?.dataRecebimento ? new Date(data.receita.dataRecebimento) : new Date(), Validators.required],
      formaPagamento: [data?.receita?.formaPagamento?.id || null, Validators.required],
      tipoReceita: [data?.receita?.tipoReceita?.id || null, Validators.required],
      descricao: [data?.receita?.descricao || ''],
      valor: [data?.receita?.valor || 0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.api.getTiposReceita().subscribe(data => this.tiposReceita = data);
    this.api.getFormasPagamento().subscribe(data => this.formasPagamento = data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const revenueData: any = {
        ...this.data?.receita,
        dataRecebimento: this.form.value.dataRecebimento.toISOString().split('T')[0],
        formaPagamento: { id: this.form.value.formaPagamento },
        tipoReceita: { id: this.form.value.tipoReceita },
        descricao: this.form.value.descricao,
        valor: this.form.value.valor,
        empresa: { id: this.data.empresa.id }
      };
      
      this.api.createReceita(revenueData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
