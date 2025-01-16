export type Color = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
  | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright'

export type StepperStatus = 'pending' | 'success' | 'error' | 'none'

export interface StepperOptions {
  pendingBadge: string
  successBadge: string
  errorBadge: string

  pendingColor: Color
  successColor: Color
  errorColor: Color

  enableSpinner: boolean
  spinnerFrames: string[]
  spinnerInterval: number

  gracefulExit: boolean
  hideCursor: boolean
}
