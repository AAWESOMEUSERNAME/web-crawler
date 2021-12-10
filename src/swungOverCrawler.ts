import got from 'got'
import { JSDOM } from 'jsdom'
import { addArticle, init } from './dao/swungoverDao'
import moment from "moment"
import { snooze } from './utils/common'


(async () => {
  console.log('start')

  let continueFlag = true;
  init();
  for (let page = 1; continueFlag; page++) {

    console.log(`fetch from page ${page}`)

    got(`https://swungover.wordpress.com/page/${page}/?blogsub=confirming`).then(res => {

      console.log(`handle data from page ${page}`)

      let doc = new JSDOM(res.body).window.document;
      let header = doc.querySelectorAll('.post .post-header');
      moment.locale('en');
      header.forEach(header => {
        let link = header.querySelectorAll('h2 a')[0] as HTMLAnchorElement;
        let date = header.querySelectorAll('.date')[0];
        let dateStr = moment(date.textContent, 'MMMM DD[,] YYYY').format('YYYY MM DD');
        addArticle(link.textContent!, dateStr, link.href);
      })
    }).catch(reason => {
      console.error(reason);
      continueFlag = false;
    });

    console.log('wait for next fetch')
    await snooze(1000)
  }
})()



