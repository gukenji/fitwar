export interface IRegisterFirstStep {
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
}

export interface IRegisterSecondStep {
  nome: string | null;
  peso: number | null;
  altura: number | null;
  data_nascimento: string | null;
  genero: number | null;
  profile_pic: File | null;
}
