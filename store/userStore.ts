import {
    action,
    makeObservable,
    observable,
    computed,
} from "mobx";

import { AdminUser, User } from "../types/user";
import databaseStore from "./databaseStore";
import _ from "lodash";
import { SQLError } from "expo-sqlite";

class UserStore {
    #user: AdminUser = {
        address: "[address]",
        privateKey: "[private-key]",
        publicKey: "[public-key]",
    };
    users: User[] = [];

    constructor() {
        makeObservable(this, {
            users: observable,
            whoami: computed,
            pushUser: action,
            dropUser: action,
            user: action,
        });
        this.loadUsersFromDatabase(); // load from database
    }

    async loadUsersFromDatabase() {
        await databaseStore.instance.transactionAsync(
            async (tx) => {
                const result = (
                    await tx.executeSqlAsync(
                        "SELECT * FROM users",
                        []
                    )
                ).rows as unknown as User[];
                this.users.splice(
                    0,
                    this.users.length,
                    ...result
                );
            }
        );
    }

    get whoami() {
        return this.#user;
    }

    user(address: string): User {
        return _.find(this.users, [
            "address",
            address,
        ]) as User;
    }

    async pushUser(user: User) {
        await databaseStore.instance.transactionAsync(
            async (tx) => {
                tx.executeSqlAsync(
                    "INSERT INTO users (address, publicKey) VALUES (?, ?)",
                    [user.address, user.publicKey]
                )
                    .then(() => this.users.push(user))
                    .catch((e) => console.log(e));
            }
        );
    }

    dropUser(
        user: User,
        callback?: () => void,
        error?: (e: SQLError) => void
    ) {
        databaseStore.instance.transaction(
            (tx) => {
                tx.executeSql(
                    "DELETE FROM users WHERE address = ?",
                    [user.address]
                );
                _.remove(this.users, [
                    "address",
                    user.address,
                ]);
            },
            error,
            callback
        );
    }
}

export default new UserStore();
