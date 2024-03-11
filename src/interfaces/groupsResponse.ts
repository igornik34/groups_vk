import { IGroup } from "./group";

export interface IGetGroupsResponse {
  result: 1 | 0;
  data?: IGroup[];
}
