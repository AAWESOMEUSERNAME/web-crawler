let snooze = (ms) => new Promise((resolve) => setTimeout(() => {
  console.log('continue')
  resolve()
}, ms));

export {snooze}
