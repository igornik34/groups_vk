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
  privacy?: TPrivacy;
  avatarColor?: string; // Цвет аватарки
  hasFriends?: boolean; // Наличие друзей
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
      state.groups = action.payload;
      state.filteredGroups = action.payload
      state.colorsAvatar = [
        ...new Set(
          action.payload
            .map((group) => group?.avatar_color)
            .filter(
              (color) => color !== null && color !== undefined
            ) as string[]
        ),
      ];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    filterGroups: (state, action: PayloadAction<IFilterOptions>) => {
      const { privacy, avatarColor, hasFriends } = action.payload;

      let filteredGroups = state.groups;

      // Фильтрация по типу приватности
      if (privacy) {
        if (privacy === "closed") {
          filteredGroups = filteredGroups.filter((group) => group.closed);
        } else if (privacy === "opened") {
          filteredGroups = filteredGroups.filter((group) => !group.closed);
        } else if (privacy === "all") {
          filteredGroups = state.groups;
        }
      }

      // Фильтрация по цвету аватарки
      if (avatarColor) {
        filteredGroups = filteredGroups.filter(
          (group) => group.avatar_color === avatarColor
        );
      }

      // Фильтрация по наличию друзей
      if (hasFriends !== undefined) {
        if (hasFriends) {
          filteredGroups = filteredGroups.filter(
            (group) => group.friends && group.friends.length > 0
          );
        }
      }

      state.filteredGroups = filteredGroups;
    },
  },
});

export default groupsSlice.reducer;
export const groupsActions = groupsSlice.actions;
