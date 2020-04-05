export interface Pessoa {
  id: string;
  nome_completo: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  sexo: string;
  falecido: boolean;
  created_at: string;
  updated_at: string;
}

export interface DataPessoa {
  data: Pessoa[];
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
