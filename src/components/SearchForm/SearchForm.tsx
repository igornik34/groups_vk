import { ChangeEvent, useContext, useEffect, useRef } from "react";
import "./style.css";
import UsersContext, { IUsersContext } from "../../store/usersContext";
import UsersService from "../../API/UsersService";
import { useFetching } from "../../hooks/useFetching";
import { IUser } from "../../interfaces/user";

export function SearchForm() {
  const { setUsers, setError, setIsLoadingUsers, setInputName, inputName } =
    useContext<IUsersContext>(UsersContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [fetchUsers, isLoading, usersError] = useFetching(async (name) => {
    if (!name) {
      setUsers([]);
      return;
    }
    const response = await UsersService.getUsersByName(name);
    const { users }: { users: IUser[] } = await response?.json();
    setUsers(users);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(inputName);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputName]);

  useEffect(() => {
    setIsLoadingUsers(isLoading);
  }, [isLoading]);

  useEffect(() => {
    usersError && setError(usersError);
  }, [usersError]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className="searchForm">
      <form>
        <input
          ref={inputRef}
          type="text"
          value={!!inputName ? inputName : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputName(e.target.value)
          }
        />
      </form>
      {!inputName && (
        <>
          <div className="searchImage">
            <img src="/searchImage.png" alt="search image" />
          </div>
        </>
      )}
    </div>
  );
}
