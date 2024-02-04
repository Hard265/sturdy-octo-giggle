import { SQLiteDatabase, openDatabase } from "expo-sqlite";

class DatabaseStore {
    instance: SQLiteDatabase;
    error?:string;


    constructor() {
        this.instance = openDatabase(
            "database_dev.db",
            undefined,
            undefined,
            undefined,
            (db) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, content TEXT, sender TEXT, timestamp TEXT, beneficiary Text)"
                        );
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS users (address PRIMARY KEY, publicKey TEXT)"
                        );
                    },
                    (e) => {
                        this.error = e.message;
                    }
                );
            }
        );
    }
}

export default new DatabaseStore();
