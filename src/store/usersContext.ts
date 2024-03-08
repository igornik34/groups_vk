import { createContext } from "react";
import { IUser } from "../interfaces/user";

export interface IUsersContext {
  users: IUser[];
  error: string | null;
  isLoadingUsers: boolean;
  setUsers: (users: IUser[]) => void;
  setError: (error: string) => void;
  setIsLoadingUsers: (isLoading: boolean) => void;
}

const UsersContext = createContext<IUsersContext>({
  users: [],
  error: null,
  isLoadingUsers: false,
  setUsers: (users: IUser[]) => {},
  setError: (error: string) => {},
  setIsLoadingUsers: (isLoading: boolean) => {},
});

export default UsersContext;
