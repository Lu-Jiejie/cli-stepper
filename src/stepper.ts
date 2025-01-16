import type { StepperOptions, StepperStatus } from './types'
import process from 'node:process'
import pc from 'picocolors'
import Terminal from './terminal'

const defaultOptions: StepperOptions = {
  pendingBadge: 'PENDING',
  successBadge: 'SUCCESS',
  errorBadge: ' ERROR ',

  pendingColor: 'yellow',
  successColor: 'green',
  errorColor: 'red',

  enableSpinner: true,
  spinnerFrames: ['-', '\\', '|', '/'],
  spinnerInterval: 500,

  gracefulExit: false,
  hideCursor: true,
}

export default class Stepper {
  private options: StepperOptions
  private terminal: Terminal = new Terminal()
  private text: string = ''
  private status: StepperStatus = 'none'
  private spinnerFrameIndex = 0
  private spinnerTimer: NodeJS.Timeout | null = null
  private spinnerText: string = ''
  private sigintCallback: (() => void) | null = null

  constructor(options: Partial<StepperOptions>) {
    this.options = { ...defaultOptions, ...options }
  }

  private render() {
    const status = this.status as Exclude<StepperStatus, 'none'>
    const color = this.options[`${status}Color`]
    const badge = this.options[`${status}Badge`]

    this.terminal.moveCursor(0)
    if (this.status === 'pending') {
      this.terminal.write(`${pc.inverse(pc[color](badge))} ${pc[color](this.text + this.spinnerText)}`)
    }
    else {
      this.terminal.write(`${pc.inverse(pc[color](badge))} ${pc[color](this.text)}`)
    }
    this.terminal.clearRight()
  }

  private end(isSignal = false) {
    const { gracefulExit } = this.options

    // unexpected stop
    if (this.status === 'pending') {
      this.status = gracefulExit ? 'success' : 'error'
    }
    this.render()

    if (this.sigintCallback) {
      process.off('SIGINT', this.sigintCallback)
      process.off('SIGTERM', this.sigintCallback)
      this.sigintCallback = null
    }

    this.spinnerTimer && clearInterval(this.spinnerTimer)

    this.terminal.toggleCursor(true)
    this.terminal.restoreCursor()
    this.terminal.newLine()
    this.status = 'none'

    // exit program only when signal
    if (isSignal) {
      process.exit(gracefulExit ? 0 : 1)
    }
  }

  // alias for pending
  public start(text: string) { this.pending(text) }

  public pending(text: string) {
    const { hideCursor, enableSpinner, spinnerInterval, spinnerFrames } = this.options
    this.text = text
    this.status = 'pending'

    // sigint callback
    if (this.sigintCallback === null) {
      this.sigintCallback = () => this.end(true)
      process.on('SIGINT', this.sigintCallback)
      process.on('SIGTERM', this.sigintCallback)
    }

    // hide cursor
    hideCursor && this.terminal.toggleCursor(false)

    // save cursor
    this.terminal.saveCursor()

    // pending frame
    if (enableSpinner) {
      this.spinnerFrameIndex = 0
      this.spinnerTimer && clearInterval(this.spinnerTimer)
      this.spinnerTimer = setInterval(() => {
        this.spinnerFrameIndex = (this.spinnerFrameIndex + 1) % this.options.spinnerFrames.length
        this.spinnerText = spinnerFrames[this.spinnerFrameIndex]
        this.render()
      }, spinnerInterval)
    }

    // render first frame
    this.spinnerText = spinnerFrames[this.spinnerFrameIndex]
    this.render()
  }

  public success(text?: string) {
    if (this.status !== 'pending')
      return

    this.status = 'success'
    this.text = text ?? this.text
    this.end()
  }

  public error(text?: string) {
    if (this.status !== 'pending')
      return

    this.status = 'error'
    this.text = text ?? this.text
    this.end()
  }
}
