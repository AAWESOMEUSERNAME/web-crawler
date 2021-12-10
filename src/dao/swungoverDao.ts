import { sqliteConn } from "./connector"

const table = {
  name: 'swung_over',
  columns: [
    ['name', 'text'],
    ['time', 'text'],
    ['url', 'text']
  ]
}

export const init = () => sqliteConn.run(`
  CREATE TABLE IF NOT EXISTS ${table.name}(
    ${table.columns.map(c => `${c[0]} ${c[1]}`).join(',')}
  )
`)

export const checkIfexists = async (name: string) => {
  const result = await sqliteConn.query(`select count(*) as count from ${table.name} where name = ?`,[name]);
  return result[0] && result;
}

export const addArticle = (name:string, time: string, url: string) => {
  sqliteConn.run(`insert into ${table.name} values(?,?,?)`,[name,time,url])
}
