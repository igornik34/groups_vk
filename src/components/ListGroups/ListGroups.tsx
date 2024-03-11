import styles from "./ListGroups.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { GroupCard } from "../GroupCard/GroupCard";
import { groupsActions } from "../../store/groups.slice";
import { useEffect, useState } from "react";
import { TPrivacy } from "../../types/privacy";

function ListGroups() {
  const { groups, filteredGroups, error, colorsAvatar } = useSelector(
    (s: RootState) => s.groups
  );
  const dispatch = useDispatch<AppDispatch>();

  const [privacy, setPrivacy] = useState<TPrivacy>();
  const [avatarColor, setAvatarColor] = useState<string>();
  const [hasFriends, setHasFriends] = useState<boolean>();

  useEffect(() => {
    dispatch(groupsActions.filterGroups({ privacy, avatarColor, hasFriends }));
  }, [privacy, avatarColor, hasFriends, dispatch]);

  const handlePrivacyChange = (privacy: TPrivacy) => {
    setPrivacy(privacy);
  };

  const handleAvatarColorChange = (color: string) => {
    setAvatarColor(color);
  };

  const handleHasFriendsChange = (hasFriends: boolean) => {
    setHasFriends(hasFriends);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <select
          onChange={(e) => handlePrivacyChange(e.target.value as TPrivacy)}
        >
          <option value="all">All</option>
          <option value="closed">Closed</option>
          <option value="opened">Opened</option>
        </select>
        <select onChange={(e) => handleAvatarColorChange(e.target.value)}>
          {colorsAvatar.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            onChange={(e) => handleHasFriendsChange(e.target.checked)}
          />
          Has Friends
        </label>
      </div>
      {filteredGroups?.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ListGroups;
