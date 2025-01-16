import process from 'node:process'
import readline from 'node:readline'

export default class Terminal {
  private stream: NodeJS.WriteStream = process.stdout

  public toggleCursor(show: boolean) {
    this.stream.write(show ? '\x1B[?25h' : '\x1B[?25l')
  }

  public moveCursor(x: number, y?: number) {
    readline.cursorTo(this.stream, x, y)
  }

  public saveCursor() {
    this.stream.write('\x1B[s')
  }

  public restoreCursor() {
    this.stream.write('\x1B[u')
  }

  public clearLine() {
    readline.clearLine(this.stream, 0)
  }

  public clearRight() {
    readline.clearLine(this.stream, 1)
  }

  public newLine() {
    this.stream.write('\n')
  }

  public write(text: string) {
    this.stream.write(text)
  }
}
