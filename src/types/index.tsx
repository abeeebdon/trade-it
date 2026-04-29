export interface UserType {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface InitialAuthStateType {
  isAuth: boolean;
  user: UserType | null;
}
export interface RootReducerType {
  auth: InitialAuthStateType;
}
