export interface UnidadeEscolar {
  id: string;
  inep: number;
  nome_completo: string;
  nome_abreviado: string;
  localizacao: string;
  inativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface DataUnidadeEscolar {
  data: UnidadeEscolar[];
  links: {};
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
