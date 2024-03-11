import { useState } from "react";
import { IGroup } from "../../interfaces/group";
import styles from "./GroupCard.module.css";

export function GroupCard(props: IGroup) {
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div className={styles.groupCard}>
      {props.avatar_color && (
        <div
          className={styles.avatar}
          style={{ backgroundColor: props.avatar_color }}
        />
      )}
      <div className={styles.groupInfo}>
        {props.name && <p className={styles.nameGroup}>{props.name}</p>}
        {props.closed !== undefined && (
          <p className={styles.closed}>
            {props.closed ? "Закрытая" : "Открытая"}
          </p>
        )}
        {props.members_count !== undefined && (
          <p>Количество участников: {props.members_count}</p>
        )}
        {props.friends && !!props.friends.length && (
          <div className={styles.friends}>
            <div className={styles.countFriends} onClick={() => setShowFriends(!showFriends)}>
              <p>Количество друзей: {props.friends.length}</p>{" "}
              <img src="/arrowDown.svg" alt="arrow down" />
            </div>
            {showFriends && (
              <div className={styles.listFriends}>
                {props.friends.map((friend, index) => (
                  <div key={index}>
                    {friend.first_name} {friend.last_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}