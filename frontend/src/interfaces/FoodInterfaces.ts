export interface IAlimento {
  id?: number;
  marca?: string | null;
  nome?: string;
  peso_referencia: number | string;
  carboidratos: number | string;
  proteinas: number | string;
  gorduras: number | string;
  calorias: number | string;
  codigo_barra: string | null;
  porcao_customizada: boolean;
  descricao_porcao: string | null;
  token: string | undefined;
}

export interface IAlimentosLista {
  food_list: IAlimento[] | null;
  error: string | null;
  refreshed: boolean;
}
