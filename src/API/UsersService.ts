export default class UsersService {
  static async getUsersByName(name: string) {
    const response = await fetch(
      `https://dummyjson.com/users/search?q=${name}`
    );
    return response
  }
}
