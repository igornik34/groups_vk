export default class UsersService {
  static async getUsersByName(name: string): Promise<Response> {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${name}`
      );
      return response;
  }
}
