export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserDTO {
  id: number;
  username: string;
  email: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}
