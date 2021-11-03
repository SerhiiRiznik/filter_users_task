import axios from "axios";

const instance = axios.create({
  baseURL: `https://randomuser.me/api`,
});

class Api {
  static getUsers() {
    return instance.get(`/?results=15`);
  }
}

export { Api };
