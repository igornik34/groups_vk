import { useContext } from "react";
import { UserCard } from "../UserCard/UserCard";

import "./style.css";
import UsersContext, { IUsersContext } from "../../store/usersContext";
import Loader from "../Loader/Loader";

export function SearchResults() {
  const { users, isLoadingUsers, error, inputName } =
    useContext<IUsersContext>(UsersContext);

  return (
    <div className="usersList">
      {isLoadingUsers && <Loader />}
      {users && inputName && (
        <p className="totalCount">Всего найдено: {users.length}</p>
      )}
      {users &&
        users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            image={user.image}
            address={user.address}
          />
        ))}
      {error && (
        <>
          <div className="errorImage">
            <img src="/errorImage.png" alt="error image" />
          </div>
          <p className="errorMessage">{error}</p>
        </>
      )}
    </div>
  );
}
