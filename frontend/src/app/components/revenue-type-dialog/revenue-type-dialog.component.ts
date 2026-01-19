import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { TipoReceita } from '../../models';

@Component({
  selector: 'app-revenue-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './revenue-type-dialog.component.html',
  styleUrl: './revenue-type-dialog.component.scss'
})
export class RevenueTypeDialogComponent {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<RevenueTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item?: TipoReceita }
  ) {
    this.isEdit = !!data?.item;
    
    this.form = this.fb.group({
      nome: [data?.item?.nome || '', Validators.required],
      cor: [data?.item?.cor || '#00C853'] // Default color
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const itemData = {
        ...this.data?.item,
        nome: this.form.value.nome,
        cor: this.form.value.cor
      };
      
      this.api.createTipoReceita(itemData).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }
}
