import type { StepperOptions, StepperStatus } from './types'
import process from 'node:process'
import pc from 'picocolors'

const defaultOptions: StepperOptions = {
  pendingBadge: 'PENDING',
  pendingColor: 'yellow',
  successBadge: 'SUCCESS',
  successColor: 'green',
  errorBadge: 'ERROR',
  errorColor: 'red',
  pendingFrames: ['-', '\\', '|', '/'],
  pendingFrameInterval: 500,
}

export class Stepper {
  private options: StepperOptions
  private curText: string = ''
  private status: StepperStatus = 'pending'
  private pendingFrameIndex = 0
  private pendingFrameTimer: NodeJS.Timeout | null = null

  constructor(options: Partial<StepperOptions>) {
    this.options = { ...defaultOptions, ...options }
  }

  private clearLine() {
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
  }

  private writeLine(status: StepperStatus, text: string) {
    const color = this.options[`${status}Color`]
    const badge = this.options[`${status}Badge`]
    process.stdout.write(`${pc.inverse(pc[color](badge))} ${pc[color](text)}\n`)
  }

  private toggleCursor(visible: boolean) {
    process.stdout.write(visible ? '\x1B[?25h' : '\x1B[?25l')
  }

  public pending(text: string) {
    const { pendingFrameInterval } = this.options
    this.curText = text
    this.toggleCursor(false)

    // pending frame
    this.pendingFrameTimer && clearInterval(this.pendingFrameTimer)
    this.pendingFrameIndex = 0
    const handlePendingFrame = () => {
      this.writeLine('pending', `${this.curText} ${this.options.pendingFrames[this.pendingFrameIndex]}`)
      this.pendingFrameIndex = (this.pendingFrameIndex + 1) % this.options.pendingFrames.length
    }
    this.pendingFrameTimer = setInterval(() => {
      this.clearLine()
      handlePendingFrame()
    }, pendingFrameInterval)

    handlePendingFrame()
  }

  public success(text?: string) {
    this.pendingFrameTimer && clearInterval(this.pendingFrameTimer)
    this.clearLine()
    this.writeLine('success', text ?? this.curText)
    // this.toggleCursor(true)
  }

  public error(text?: string) {
    this.pendingFrameTimer && clearInterval(this.pendingFrameTimer)
    this.clearLine()
    this.writeLine('error', text ?? this.curText)
    // this.toggleCursor(true)
  }
}
