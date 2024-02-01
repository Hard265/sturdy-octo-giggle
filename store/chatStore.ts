import { action, makeObservable, observable, transaction } from "mobx";
import _ from "lodash"
import { SQLiteDatabase, openDatabase, } from "expo-sqlite";
import { Message } from "../util/types";
import * as crypto from "expo-crypto";
import databaseStore from "./databaseStore";


class ChatStore {
    messages: Message[] = [];
    database: SQLiteDatabase;

    constructor() {
        makeObservable(this, {
            messages: observable,
            pushMessage: action,
            deleteMessages: action,
            deleteAll: action
        })
        this.database = databaseStore.instance;
        this.loadMessagesFromDatabase();
    }

    pushMessage(message: Message) {
        this.messages.push(message)
        this.database.transaction(transaction => {
            transaction.executeSql(
                'INSERT INTO messages (id, content, sender, timestamp, beneficiary) VALUES (?, ?, ?, ?, ?)',
                [message.id, message.content, message.sender, message.timestamp, message.beneficiary],
                () => { console.log("message pushed") },
                (e, i) => {
                    console.log("error", i.message);
                    return false
                }
            )
        })
    }

    deleteMessages(messagesId: string[]) {
        this.messages.filter((value) => (_.includes(messagesId, value.id)))
    }

    async deleteAll() {
        await this.database.transactionAsync(async transaction => {
            await transaction.executeSqlAsync('DELETE FROM messages', []);
        })
    }

    async loadMessagesFromDatabase() {
        await this.database.transactionAsync(async transaction => {
            const result = (await transaction.executeSqlAsync('SELECT * FROM messages', [])).rows as unknown as Message[]
            this.messages.splice(0, this.messages.length, ...result)
        }, true)
    }
}


const chatStore = new ChatStore();
export { chatStore as default };