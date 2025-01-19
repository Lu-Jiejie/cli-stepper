import Stepper from '../src/stepper'

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function test() {
  const stepper = new Stepper({
    spinnerInterval: 300,
  })

  // 测试成功场景
  stepper.start('Downloading')
  await sleep(2000)
  stepper.success('Downloaded!')

  // 测试失败场景
  stepper.pending('Uploading')
  await sleep(2000)
  stepper.error('Failed to upload!')
}

// 运行测试
test().catch(console.error)
