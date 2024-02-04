import { SQLiteDatabase, openDatabase } from "expo-sqlite";

class DatabaseStore {
    instance: SQLiteDatabase;

    constructor() {
        this.instance = openDatabase(
            "database_dev.db",
            undefined,
            undefined,
            undefined,
            (db) => {
                db.transactionAsync(async (tx) => {
                    tx.executeSqlAsync(
                        "CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, content TEXT, sender TEXT, timestamp TEXT, beneficiary Text)"
                    );
                    tx.executeSqlAsync(
                        "CREATE TABLE IF NOT EXISTS users (address PRIMARY KEY, publicKey TEXT)"
                    );
                });
            }
        );
    }
}

export default new DatabaseStore();
