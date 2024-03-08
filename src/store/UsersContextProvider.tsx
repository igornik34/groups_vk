import { ReactNode, useState } from "react";
import UsersContext, { IUsersContext } from "./usersContext";
import { IUser } from "../interfaces/user";

function UsersContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string | null>(null);

  const setUsersHandler = (users: IUser[]) => {
    setUsers(users);
  };
  const setErrorHandler = (error: string) => {
    setError(error);
  };
  const setIsLoadingUsersHandler = (isLoading: boolean) => {
    setIsLoadingUsers(isLoading);
  };
  const setInputNameHandler = (value: string) => {
    setInputName(value);
  };

  const usersContext: IUsersContext = {
    users,
    error,
    isLoadingUsers,
    inputName,
    setUsers: setUsersHandler,
    setError: setErrorHandler,
    setIsLoadingUsers: setIsLoadingUsersHandler,
    setInputName: setInputNameHandler
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
