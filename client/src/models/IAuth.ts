import { IUser } from "./IUser";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: {
    access: string;
  };
}

export interface IAuthInitialState {
  isAuthenticated: boolean;
  user: IUser | null;
}
