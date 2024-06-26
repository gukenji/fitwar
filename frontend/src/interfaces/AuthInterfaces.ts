export interface IJWTDecode {
  user_id: number;
  token_type: string;
  exp: string;
  nome: string;
  superuser: boolean;
  staff: boolean;
  altura: number;
  peso: number;
  data_nascimento: string;
  genero: number;
  taxa_metabolica: number;
  meta_calorias: number;
  profile_pic: File;
}
export interface ITokenInfo {
  refresh: string;
  access: string;
}

export interface IUserData {
  nome: string;
  user_id: number;
  superuser: boolean;
  staff: boolean;
  altura: number;
  peso: number;
  data_nascimento: string;
  genero: number;
  taxa_metabolica: number;
  meta_calorias: number;
  profile_pic: File;
}

export interface IUserLogin {
  email: string;
  password: string;
}
