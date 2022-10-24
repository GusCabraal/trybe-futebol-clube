type IUserDTO = {
  id: number;
  username: string;
  email: string;
};

declare namespace Express {
  interface Request {
    user: IUserDTO;
  }
}
