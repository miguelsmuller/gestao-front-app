export interface Cargo {
  id?: number;
  nome: string;
  inativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface DataCargo {
  data: Cargo[];
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
