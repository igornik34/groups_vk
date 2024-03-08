import { createContext } from "react";
import { IUser } from "../interfaces/user";

export interface IUsersContext {
  users: IUser[] | null;
  error: string | null;
  isLoadingUsers: boolean;
  inputName: string | null;
  setInputName: (value: string) => void
  setUsers: (users: IUser[]) => void;
  setError: (error: string) => void;
  setIsLoadingUsers: (isLoading: boolean) => void;
}

const UsersContext = createContext<IUsersContext>({
  users: null,
  error: null,
  isLoadingUsers: false,
  inputName: null,
  setInputName: (value: string) => {},
  setUsers: (users: IUser[]) => {},
  setError: (error: string) => {},
  setIsLoadingUsers: (isLoading: boolean) => {},
});

export default UsersContext;
