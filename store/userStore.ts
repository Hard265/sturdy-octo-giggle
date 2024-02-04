import { action, makeObservable, observable, computed } from "mobx";

import { AdminUser, User } from "../types/user";
import databaseStore from "./databaseStore";

class UserStore {
  #user: AdminUser | null = null;
  users: User[] = [];

  constructor() {
    makeObservable(this, {
      users: observable,
      pushUser: action,
      dropUser: action,
      whoami: computed
    });
    this.loadUsersFromDatabase(); // load from database
  }

  async loadUsersFromDatabase() {
    await databaseStore.instance.transactionAsync(async (tx) => {
      const result = (await tx.executeSqlAsync("SELECT * FROM users", []))
        .rows as unknown as User[];
      this.users.splice(0, this.users.length, ...result);
    });
  }

  get whoami(){
    return this.#user
  }

  async pushUser(user: User) {
    await databaseStore.instance.transactionAsync(async (tx) => {
      tx.executeSqlAsync(
        "INSERT INTO users (address, publicKey) VALUES (?, ?)",
        [user.address, user.publicKey]
      );
      this.users.push(user);
    });
  }

  async dropUser(user: User) {}

  // public static privateKey(): string {
  //   return this.#user?.privateKey ?? "";
  // }

  // public static publicKey(): string {
  //   return this.#user?.publicKey ?? "";
  // }

  // public static address(): string {
  //   return this.#user?.address ?? "";
  // }
}

export default new UserStore();
