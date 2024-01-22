import { action, makeObservable, observable, transaction } from "mobx";
import _ from "lodash"
import { SQLiteDatabase, openDatabase } from "expo-sqlite";

type Message = {
    id: string;
    content: string;
    sender: string;
}

class ChatStore {
    messages: Message[] = [];
    database: SQLiteDatabase;

    constructor() {
        makeObservable(this, {
            messages: observable,
            pushMessage: action,
            deleteMessages: action
        })

        this.database = openDatabase("ChatDatabase.db", undefined, undefined, undefined, (db) => {
            db.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS messages (
                    id TEXT PRIMARY KEY,
                    content TEXT,
                    sender TEXT
                  )`
                )
            })
        });
        this.loadMessagesFromDatabase();
    }

    pushMessage(message: Message) {
        this.messages.push(message)
        this.database.transaction(transaction => {
            transaction.executeSql(
                'INSERT INTO messages (id, content, sender) VALUES (?, ?, ?)',
                [message.id, message.content, message.sender]
            )
        })
    }

    deleteMessages(messagesId: string[]) {
        this.messages.filter((value) => (_.includes(messagesId, value.id)))
    }

    async loadMessagesFromDatabase() {
        await this.database.transactionAsync(async transaction => {
            const result = (await transaction.executeSqlAsync('SELECT * FROM messages', [])).rows as unknown as Message[]
            this.messages.splice(0, this.messages.length, ...result)
        }, true)
    }
}


const chatStore = new ChatStore();
export { chatStore as default, Message };