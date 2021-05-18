let i = 0;

let af = (times) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('af 执行, times:', times)
      resolve(times)
    }, 5000)
  })
}

let bf = (s) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('bf 执行, get s:', s)
      resolve()
    }, 10000)
  })
}

let f = async () => {
  for (; i < 10; i++) {
    console.log(1)
    let times = await af(i);
    console.log(2)
    bf(times)
  }
}


console.log('start')
f().then(value => console.log('end'))

