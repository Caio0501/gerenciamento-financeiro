export interface Empresa {
  id?: string;
  nome: string;
  cnpj?: string;
  descricao?: string;
  dataCriacao?: string;
}

export interface CategoriaGasto {
  id?: string;
  nome: string;
  cor?: string;
}

export interface FormaPagamento {
  id?: string;
  nome: string;
  icone?: string;
}

export interface TipoReceita {
  id?: string;
  nome: string;
  cor?: string;
}

export interface Gasto {
  id?: string;
  empresa: Empresa;
  dataPagamento: string;
  formaPagamento: FormaPagamento;
  categoria: CategoriaGasto;
  descricao?: string;
  valor: number;
}

export interface Receita {
  id?: string;
  empresa: Empresa;
  dataRecebimento: string;
  formaPagamento: FormaPagamento;
  tipoReceita: TipoReceita;
  descricao?: string;
  valor: number;
}
