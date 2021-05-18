import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node'
});

let addArticle = (name, date, url) => {
  pool.query(`insert into article(name,date,url) values('${name}','${date}','${url}')`, (err, results, fields) => {
    if (err) {
      console.error('error: ', err)
    }
  });
}

export {addArticle}
