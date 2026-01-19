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
import { CategoriaGasto, FormaPagamento, Gasto, Empresa } from '../../models';

@Component({
  selector: 'app-expense-dialog',
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
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.scss'
})
export class ExpenseDialogComponent implements OnInit {
  form: FormGroup;
  categorias: CategoriaGasto[] = [];
  formasPagamento: FormaPagamento[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { gasto?: Gasto; empresa: Empresa }
  ) {
    this.isEdit = !!data?.gasto;
    
    this.form = this.fb.group({
      dataPagamento: [data?.gasto?.dataPagamento ? new Date(data.gasto.dataPagamento) : new Date(), Validators.required],
      formaPagamento: [data?.gasto?.formaPagamento?.id || null, Validators.required],
      categoria: [data?.gasto?.categoria?.id || null, Validators.required],
      descricao: [data?.gasto?.descricao || ''],
      valor: [data?.gasto?.valor || 0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.api.getCategorias().subscribe(data => this.categorias = data);
    this.api.getFormasPagamento().subscribe(data => this.formasPagamento = data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const expenseData: any = {
        ...this.data?.gasto,
        dataPagamento: this.form.value.dataPagamento.toISOString().split('T')[0],
        formaPagamento: { id: this.form.value.formaPagamento },
        categoria: { id: this.form.value.categoria },
        descricao: this.form.value.descricao,
        valor: this.form.value.valor,
        empresa: { id: this.data.empresa.id }
      };
      
      this.api.createGasto(expenseData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
