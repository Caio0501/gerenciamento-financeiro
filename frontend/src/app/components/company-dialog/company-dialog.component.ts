import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Empresa } from '../../models';

@Component({
  selector: 'app-company-dialog',
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
  templateUrl: './company-dialog.component.html',
  styleUrl: './company-dialog.component.scss'
})
export class CompanyDialogComponent {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empresa?: Empresa }
  ) {
    this.isEdit = !!data?.empresa;
    
    this.form = this.fb.group({
      nome: [data?.empresa?.nome || '', Validators.required],
      cnpj: [data?.empresa?.cnpj || ''],
      descricao: [data?.empresa?.descricao || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const companyData = {
        ...this.data?.empresa,
        ...this.form.value
      };
      
      this.api.createEmpresa(companyData).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }
}
