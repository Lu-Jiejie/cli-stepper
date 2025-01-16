import { Stepper } from '../src/stepper'

async function demo() {
  const stepper = new Stepper({
    pendingFrames: ['', '.', '..', '...'],
  }) // 使用默认配置

  // 模拟安装依赖过程
  stepper.pending('正在安装项目依赖')
  await sleep(2000)
  stepper.success('依赖安装完成！')

  // 模拟部署过程
  stepper.pending('正在部署到服务器')
  await sleep(10000)
  try {
    throw new Error('网络连接失败')
    // stepper.success('部署完成！');
  }
  catch (error) {
    stepper.error(`部署失败：${(error as Error).message}`)
  }
}

// 辅助函数：延迟执行
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 运行演示
demo().catch(console.error)
