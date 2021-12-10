/**
 * 延迟执行
 * @param ms 间隔毫秒值
 */
const snooze = (ms: number) => new Promise<void>((resolve) => setTimeout(() => {
  console.log('continue')
  resolve()
}, ms));

export { snooze }
