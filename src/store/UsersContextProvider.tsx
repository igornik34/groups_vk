import { ReactNode, useState } from "react";
import UsersContext, { IUsersContext } from "./usersContext";
import { IUser } from "../interfaces/user";

function UsersContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

  const setUsersHandler = (users: IUser[]) => {
    setUsers(users);
  };
  const setErrorHandler = (error: string) => {
    setError(error);
  };
  const setIsLoadingUsersHandler = (isLoading: boolean) => {
    setIsLoadingUsers(isLoading);
  };

  const usersContext: IUsersContext = {
    users,
    error,
    isLoadingUsers,
    setUsers: setUsersHandler,
    setError: setErrorHandler,
    setIsLoadingUsers: setIsLoadingUsersHandler,
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
