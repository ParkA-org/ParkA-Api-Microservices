export interface IResetPassword {
  email: string;

  origin: string;

  code: string;

  salt: string;

  completed: boolean;

  updatedAt: string;

  createdAt: string;
}
