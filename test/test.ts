// import { Stepper } from '../src/stepper2'

// async function demo() {
//   const stepper = new Stepper({
//     spinnerFrames: ['', '.', '..', '...'],
//   })

//   // 第一个任务
//   const task1 = stepper.pending('正在安装项目依赖')
//   await sleep(2000)
//   task1.success('依赖安装完成！')

//   // 第二个任务（可以与其他任务并行）
//   const task2 = stepper.pending('正在部署到服务器')
//   await sleep(3000)
//   try {
//     throw new Error('网络连接失败')
//   }
//   catch (error) {
//     task2.error(`部署失败：${(error as Error).message}`)
//   }

//   // 第三个任务
//   const task3 = stepper.pending('正在配置环境')
//   await sleep(2000)
//   task3.success('环境配置完成')
// }

// function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

// demo().catch(console.error)
