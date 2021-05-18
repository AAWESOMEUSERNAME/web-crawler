import got from "got";


got(`https://swungover.wordpress.com/page/100/?blogsub=confirming`).then(res => {
  console.log(res.status)
}).catch(reason => {
  console.log(reason)
});
