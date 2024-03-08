export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    address: IAddress;
  }
  
  export interface IAddress {
    city: string;
  }