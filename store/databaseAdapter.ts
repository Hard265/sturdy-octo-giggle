import { SQLiteDatabase, openDatabase } from "expo-sqlite";

class DatabaseAdapter {
    database: SQLiteDatabase;

    constructor(){
        this.database = openDatabase("database.db", undefined, undefined, undefined,(db)=>{
            db.transaction((tx)=>{
                tx.executeSql(`CREATE TABLE IF NOT EXISTS messages (
                    id TEXT PRIMARY KEY,
                    content TEXT,
                    sender TEXT,
                    timestamp TEXT,
                    beneficiary Text
                  )`
                );
                tx.executeSql(`CREATE TABLE IF NOT EXISTS configurations (
                    id INT PRIMARY AUTOINCREMENT KEY,
                    key TEXT,
                    value TEXT,
                  )`
                )
            })
        });

    }
}

const db = new DatabaseAdapter();
export default db;