import got from 'got'
import {JSDOM} from 'jsdom'
import {addArticle} from './service.js'
import moment from "moment"

let snooze = (ms) => new Promise((resolve) => setTimeout(() => {
  console.log('continue to fetch')
  resolve()
}, ms));

(async () => {
  console.log('start')
  let i = 1
  for (; ; i++) {
    console.log(`fetch from page ${i}`)
    got(`https://swungover.wordpress.com/page/${i}/?blogsub=confirming`).then(res => {
      console.log(`handle data from page ${i}`)
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
      break
    });

    console.log('wait for next fetch')
    await snooze(1000)
    if (i > 1000) {
      console.error('too much request')
      break
    }
  }
})()



