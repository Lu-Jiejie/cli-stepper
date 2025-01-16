export type Color = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
  | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright'

export type StepperStatus = 'pending' | 'success' | 'error'

export interface StepperOptions {
  pendingBadge: string
  pendingColor: Color
  successBadge: string
  successColor: Color
  errorBadge: string
  errorColor: Color
  pendingFrames: string[]
  pendingFrameInterval: number
}
