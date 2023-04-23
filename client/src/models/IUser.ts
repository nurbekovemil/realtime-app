export interface IUser {
  id: number;
  name: string;
  email: string;
  status: boolean;
  updatedAt: string;
}

export interface IUserInitialState {
  users: IUser[];
}

export interface IUserSearchItemProps {
  user: IUser;
}
