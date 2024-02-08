import {
    action,
    makeObservable,
    observable,
    transaction,
} from "mobx";
import _ from "lodash";
import { SQLiteDatabase, openDatabase } from "expo-sqlite";
import * as crypto from "expo-crypto";
import databaseStore from "./databaseStore";
import userStore from "./userStore";
import { Message } from "../types/chat";

class ChatStore {
    messages: Message[] = [];
    database: SQLiteDatabase;

    constructor() {
        makeObservable(this, {
            messages: observable,
            pushMessage: action,
            deleteMessages: action,
            deleteAll: action,
            user_messages: action,
            loadMessagesFromDatabase: action,
        });
        this.database = databaseStore.instance;
        this.loadMessagesFromDatabase();
    }

    async user_messages(
        user_address: string
    ): Promise<Message[]> {
        const messages: Message[] = [];
        await this.database.transactionAsync(
            async (transaction) => {
                const results =
                    await transaction.executeSqlAsync(
                        "SELECT * FROM messages WHERE (sender = ? AND beneficiary = ?) OR (sender = ? AND beneficiary = ?)",
                        [
                            user_address,
                            userStore.whoami?.address,
                            userStore.whoami?.address,
                            user_address,
                        ]
                    );
                messages.splice(
                    0,
                    messages.length,
                    ...(results.rows as unknown as Message[])
                );
            }
        );
        return messages;
    }

    pushMessage(message: Message, user_address: string) {
        this.messages.push(message);
        this.database.transaction((transaction) => {
            transaction.executeSql(
                "INSERT INTO messages (id, content, sender, timestamp, beneficiary, user_id) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    message.id,
                    message.content,
                    message.sender,
                    message.timestamp,
                    message.beneficiary,
                    user_address,
                ],
                () => {
                    console.log("message added");
                },
                (e, i) => {
                    console.log("error", i.message);
                    return false;
                }
            );
        });
    }

    deleteMessages(messagesId: string[]) {
        this.database.transaction(
            (transaction) => {
                messagesId.forEach((id) => {
                    transaction.executeSql(
                        "DELETE FROM messages WHERE id = ?",
                        [id]
                    );
                });
            },
            () => console.log(),
            () => {
                this.messages.filter((value) =>
                    _.includes(messagesId, value.id)
                );
                console.log("messages deleted");
            }
        );
    }

    async deleteAll() {
        await this.database.transactionAsync(
            async (transaction) => {
                await transaction.executeSqlAsync(
                    "DELETE FROM messages",
                    []
                );
            }
        );
    }

    async loadMessagesFromDatabase() {
        await this.database.transactionAsync(
            async (transaction) => {
                const result = (
                    await transaction.executeSqlAsync(
                        "SELECT * FROM messages",
                        []
                    )
                ).rows as unknown as Message[];
                this.messages.splice(
                    0,
                    this.messages.length,
                    ...result
                );
            },
            true
        );
    }
}

const chatStore = new ChatStore();
export { chatStore as default };
