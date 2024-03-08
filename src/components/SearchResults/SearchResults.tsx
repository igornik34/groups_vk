import { useContext } from "react";
import { UserCard } from "../UserCard/UserCard";

import "./style.css";
import UsersContext, { IUsersContext } from "../../store/usersContext";
import Loader from "../Loader/Loader";

export function SearchResults() {
  const { users, isLoadingUsers, error } =
    useContext<IUsersContext>(UsersContext);

  return (
    <div className="usersList">
      {isLoadingUsers && <Loader />}
      {users && users.map((user) => <UserCard key={user.id} {...user} />)}
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}
