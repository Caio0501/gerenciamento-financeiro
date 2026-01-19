import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { FormaPagamento } from '../../models';

@Component({
  selector: 'app-payment-method-dialog',
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
  templateUrl: './payment-method-dialog.component.html',
  styleUrl: './payment-method-dialog.component.scss'
})
export class PaymentMethodDialogComponent {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<PaymentMethodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item?: FormaPagamento }
  ) {
    this.isEdit = !!data?.item;
    
    this.form = this.fb.group({
      nome: [data?.item?.nome || '', Validators.required],
      icone: [data?.item?.icone || '💵'] // Default emoji icon
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
        icone: this.form.value.icone
      };
      
      this.api.createFormaPagamento(itemData).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }
}
