import {
    action,
    makeObservable,
    observable,
    transaction,
} from "mobx";
import _ from "lodash";
import { SQLiteDatabase, openDatabase } from "expo-sqlite";
import { Message } from "../util/types";
import * as crypto from "expo-crypto";
import databaseStore from "./databaseStore";
import userStore from "./userStore";

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
        });
        this.database = databaseStore.instance;
        this.loadMessagesFromDatabase();
    }

    user_messages(user_address: string) {
        return _.filter(this.messages, (message) => {
            return (message.sender === user_address && message.beneficiary === userStore.whoami?.address) || (message.sender === userStore.whoami?.address && message.beneficiary === user_address);
        })
    }

    pushMessage(message: Message) {
        this.messages.push(message);
        this.database.transaction((transaction) => {
            transaction.executeSql(
                "INSERT INTO messages (id, content, sender, timestamp, beneficiary) VALUES (?, ?, ?, ?, ?)",
                [
                    message.id,
                    message.content,
                    message.sender,
                    message.timestamp,
                    message.beneficiary,
                ],
                () => {
                    console.log("message pushed");
                },
                (e, i) => {
                    console.log("error", i.message);
                    return false;
                }
            );
        });
    }

    deleteMessages(messagesId: string[]) {
        console.log(messagesId);
        
        this.database.transaction(
            (transaction) => {
                messagesId.forEach((id) => {
                    transaction.executeSql(
                        "DELETE FROM messages WHERE id = ?",
                        [id]
                    );
                });
            },
            undefined,
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
