import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { FormaPagamento } from '../../models';
import { PaymentMethodDialogComponent } from '../payment-method-dialog/payment-method-dialog.component';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss'
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: FormaPagamento[] = [];
  displayedColumns: string[] = ['icon', 'nome', 'actions'];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.api.getFormasPagamento().subscribe(data => this.paymentMethods = data);
  }

  openDialog(item?: FormaPagamento) {
    const dialogRef = this.dialog.open(PaymentMethodDialogComponent, {
      width: '500px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.snackBar.open('Forma de pagamento salva!', 'Fechar', { duration: 3000 });
      }
    });
  }

  delete(item: FormaPagamento) {
    if (confirm(`Excluir ${item.nome}?`)) {
      // Note: API doesn't have delete endpoint yet, would need to add
      this.snackBar.open('Funcionalidade em desenvolvimento', 'Fechar', { duration: 3000 });
    }
  }
}
