import Stepper from '../src/stepper'

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function test() {
  const stepper = new Stepper({
    spinnerFrames: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
    spinnerInterval: 300,
    pendingBadge: ' 进行中 ',
    successBadge: ' 完成 ',
    errorBadge: ' 失败 ',
  })

  // 测试成功场景
  stepper.start('正在下载文件...')
  await sleep(3000)
  stepper.success('文件下载完成！')

  // 暂停一下，以便观察
  await sleep(1000)

  // 测试失败场景
  stepper.pending('正在连接服务器...')
  await sleep(2000)
  stepper.error('连接服务器失败！')

  // 暂停一下，以便观察
  await sleep(1000)

  // 测试长时间运行
  stepper.start('正在处理数据，请稍候...')
  await sleep(4000)
  stepper.success()
}

// 运行测试
test().catch(console.error)
