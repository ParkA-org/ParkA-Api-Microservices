export interface IConfirmEmail {
  _id: string;

  id: string;

  email: string;

  origin: string;

  code: string;

  completed: boolean;

  updatedAt: string;

  createdAt: string;
}
