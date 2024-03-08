import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import UsersContext, { IUsersContext } from "../../store/usersContext";
import UsersService from "../../API/UsersService";
import { useFetching } from "../../hooks/useFetching";
import { IUser } from "../../interfaces/user";

export function SearchForm() {
  const [valueInput, setValueInput] = useState<string>("");
  const { setUsers, setError, setIsLoadingUsers } =
    useContext<IUsersContext>(UsersContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [fetchUsers, isLoading, usersError] = useFetching(async (name) => {
    setIsLoadingUsers(true);
    const response = await UsersService.getUsersByName(name);
    const { users }: { users: IUser[] } = await response.json();
    setUsers(users);
    setIsLoadingUsers(false);
  });

  useEffect(() => {
    if (valueInput) fetchUsers(valueInput);
  }, [valueInput]);

  useEffect(() => {
    setIsLoadingUsers(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (usersError) setError(usersError);
  }, [usersError]);

  return (
    <div className="searchForm">
      <form>
        <input
          ref={inputRef}
          type="text"
          value={valueInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValueInput(e.target.value)
          }
        />
      </form>
    </div>
  );
}
