import mysql from 'mysql';
import sqlite, { Database } from 'sqlite3';

class MysqlConnector {
  private readonly pool: mysql.Pool;

  constructor(pool: mysql.Pool) {
    this.pool = pool;
  }

  run = (sql: string) => {
    this.pool.query(sql, (err, results, fields) => {
      if (err) {
        console.error('error: ', err)
      }
      return results;
    });
  }
}
const s = sqlite.verbose();
class SqliteConnector {
  private readonly database: Database;

  constructor(fileName: string) {
    this.database = new s.Database(fileName);
  }

  run = (sql: string, params: any[] = []) => {
    console.log(`excute sql: ${sql}, params: ${params}`)
    this.database.run(sql, params);
  }

  query = (sql: string, params: any[] = []) => {
    console.log(`excute sql: ${sql}, params: ${params}`)
    return new Promise<any[]>((resolve, reject) => {
      this.database.all(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    });
  }

}

const mysqlConn = new MysqlConnector(mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node'
}))

const sqliteConn = new SqliteConnector('sqliteDB.db');

export { mysqlConn, sqliteConn }
