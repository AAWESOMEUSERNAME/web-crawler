import got from 'got'
import {JSDOM} from 'jsdom'
import {addArticle} from './db.js'
import moment from "moment"
import {snooze} from './common.js'


(async () => {
  console.log('start')
  let page = 1
  const maxPage = 57
  for (; page <= maxPage; page++) {
    console.log(`fetch from page ${page}`)
    got(`https://swungover.wordpress.com/page/${page}/?blogsub=confirming`).then(res => {
      console.log(`handle data from page ${page}`)
      let doc = new JSDOM(res.body).window.document;
      let header = doc.querySelectorAll('.post .post-header');
      header.forEach(header => {
        let link = header.querySelectorAll('h2 a')[0];
        let date = header.querySelectorAll('.date')[0];
        moment.locale('en')
        let dateStr = moment(date.textContent, 'MMMM DD[,] YYYY').format('YYYY MM DD');
        addArticle(link.textContent, dateStr, link.href)
      })
    }).catch(reason => {
      console.error(reason)
    });

    console.log('wait for next fetch')
    await snooze(1000)
  }
})()



