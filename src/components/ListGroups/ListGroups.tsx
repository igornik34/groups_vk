import styles from "./ListGroups.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { GroupCard } from "../GroupCard/GroupCard";
import { groupsActions } from "../../store/groups.slice";
import { useEffect, useState } from "react";
import { TPrivacy } from "../../types/privacy";

function ListGroups() {
  const { filteredGroups, colorsAvatar } = useSelector(
    (s: RootState) => s.groups
  );
  const dispatch = useDispatch<AppDispatch>();

  const [privacy, setPrivacy] = useState<TPrivacy | null>(null);
  const [avatarColor, setAvatarColor] = useState<string | "all" | null>(null);
  const [hasFriends, setHasFriends] = useState<boolean | null>(null);

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

  const handleResetFilters = () => {
    setPrivacy(null);
    setAvatarColor(null);
    setHasFriends(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <select
          onChange={(e) => handlePrivacyChange(e.target.value as TPrivacy)}
        >
          <option value="all" selected={privacy === null}>
            All
          </option>
          <option value="closed">Closed</option>
          <option value="opened">Opened</option>
        </select>
        <select onChange={(e) => handleAvatarColorChange(e.target.value)}>
          <option value="all" selected={avatarColor === null}>
            All
          </option>
          {colorsAvatar.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={hasFriends ?? false}
            onChange={(e) => handleHasFriendsChange(e.target.checked)}
          />
          Has Friends
        </label>
        <button onClick={handleResetFilters}>Reset</button>
      </div>
      <p className={styles.totalCount}>
        Всего найдено: {filteredGroups?.length}
      </p>
      {filteredGroups?.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </div>
  );
}

export default ListGroups;
