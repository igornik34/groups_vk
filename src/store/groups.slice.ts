import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGroup } from "../interfaces/group";
import { TPrivacy } from "../types/privacy";

export interface IGroupsState {
  groups: IGroup[];
  colorsAvatar: string[];
  filteredGroups?: IGroup[];
  error?: string;
}

export interface IFilterOptions {
  privacy: TPrivacy | null;
  avatarColor: string | "all" | null;
  hasFriends: boolean | null;
}

const initialState: IGroupsState = {
  groups: [],
  colorsAvatar: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addAllGroups: (state, action: PayloadAction<IGroup[]>) => {
      const groups = action.payload;
      state.groups = groups;
      state.filteredGroups = groups;
      state.colorsAvatar = [...new Set(groups.map(group => group.avatar_color).filter(color => !!color) as string[])];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    filterGroups: (state, action: PayloadAction<IFilterOptions>) => {
      const { privacy, avatarColor, hasFriends } = action.payload;

      state.filteredGroups = state.groups.filter(group => {
        if (privacy !== null) {
          if (privacy === "closed") {
            return group.closed;
          } else if (privacy === "opened") {
            return !group.closed;
          }
        }
        return true;
      }).filter(group => avatarColor === null || avatarColor === "all" || group.avatar_color === avatarColor)
        .filter(group => hasFriends === null || hasFriends === false || (group.friends && group.friends.length > 0));
    },
  },
});

export default groupsSlice.reducer;
export const groupsActions = groupsSlice.actions;
