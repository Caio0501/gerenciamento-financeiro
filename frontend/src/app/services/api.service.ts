import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa, CategoriaGasto, FormaPagamento, TipoReceita, Gasto, Receita } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Empresa
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.apiUrl}/empresas`);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${this.apiUrl}/empresas`, empresa);
  }

  deleteEmpresa(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/empresas/${id}`);
  }

  // Auxiliares
  getCategorias(): Observable<CategoriaGasto[]> {
    return this.http.get<CategoriaGasto[]>(`${this.apiUrl}/auxiliares/categorias`);
  }

  createCategoria(c: CategoriaGasto): Observable<CategoriaGasto> {
    return this.http.post<CategoriaGasto>(`${this.apiUrl}/auxiliares/categorias`, c);
  }

  getFormasPagamento(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(`${this.apiUrl}/auxiliares/formas-pagamento`);
  }

  createFormaPagamento(f: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(`${this.apiUrl}/auxiliares/formas-pagamento`, f);
  }

  getTiposReceita(): Observable<TipoReceita[]> {
    return this.http.get<TipoReceita[]>(`${this.apiUrl}/auxiliares/tipos-receita`);
  }

  createTipoReceita(t: TipoReceita): Observable<TipoReceita> {
    return this.http.post<TipoReceita>(`${this.apiUrl}/auxiliares/tipos-receita`, t);
  }

  // Financeiro
  getGastos(empresaId: string): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/financeiro/gastos/${empresaId}`);
  }

  createGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${this.apiUrl}/financeiro/gastos`, gasto);
  }

  getReceitas(empresaId: string): Observable<Receita[]> {
    return this.http.get<Receita[]>(`${this.apiUrl}/financeiro/receitas/${empresaId}`);
  }

  createReceita(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(`${this.apiUrl}/financeiro/receitas`, receita);
  }
}
