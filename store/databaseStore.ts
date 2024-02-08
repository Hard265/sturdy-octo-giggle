import { SQLiteDatabase, openDatabase } from "expo-sqlite";

class DatabaseStore {
    instance: SQLiteDatabase;
    error?: string;


    constructor() {
        this.instance = openDatabase(
            "database_dev_2.db",
            undefined,
            undefined,
            undefined,
            (db) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "CREATE TABLE IF NOT EXISTS users (address TEXT PRIMARY KEY, publicKey TEXT)"
                        );
                        tx.executeSql(
                            `CREATE TABLE messages (
                                id TEXT PRIMARY KEY,
                                content TEXT,
                                sender TEXT,
                                timestamp TEXT,
                                beneficiary TEXT,
                                user_id TEXT NOT NULL,
                                FOREIGN KEY (user_id) REFERENCES users (address) ON DELETE CASCADE
                            )`
                        );
                        tx.executeSql(
                            `CREATE TABLE user (
                                address TEXT PRIMARY KEY,
                                publicKey TEXT
                            )`
                        )
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

/**
 * user table
 * +-------------------+---------------+
 * | address           | publicKey     |
 * +-------------------+---------------+
 * | TEXT PRIMARY KEY  | TEXT          |
 * +-------------------+---------------+
 * 
 * messages table 
 * +-------------------+---------------+---------+-----------+-------------+--------------+
 * | id                | content       | sender  | timestamp | beneficiary | message_id   | 
 * +-------------------+---------------+---------+-----------+-------------+--------------+
 * | TEXT PRIMARY KEY  | TEXT          | TEXT    | TEXT      | TEXT        | TEXT NOT NULL|
 * +-------------------+---------------+---------+-----------+-------------+--------------+
 * FOREIGN KEY (message_id)
 *   REFERENCES user (message_id) 
 *      ON DELETE CASCADE
 */

