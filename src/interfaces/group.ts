export interface IGroup {
  "id": number,
  "name": string,
  "closed": boolean,
  "avatar_color"?: string,
  "members_count": number,
  "friends"?: IUser[]
}

export interface IUser {
  "first_name": string,
  "last_name": string
}