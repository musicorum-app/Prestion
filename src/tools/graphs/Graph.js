import chroma from 'chroma-js'
import {convertRange} from "@musicorum/prestion/utils";

export default class Graph {
  constructor(name, colors) {
    this.name = name
    this.colors = colors
    this.size = [200, 100]
    this.top = 32
    this.left = 20
    this.values = []
    this.c = 60
    this.cVal = 0
    this.label = v => v
  }

  load() {
    this.createCanvas()
  }

  update() {

  }

  createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.width = this.size[0]
    canvas.height = this.size[1]

    const ctx = canvas.getContext('2d')


    this.canvas = canvas

    this.grad = ctx.createLinearGradient(0, 0, 0, this.size[1])
    this.grad.addColorStop(0, chroma(this.colors.primary).alpha(.4))
    this.grad.addColorStop(1, chroma(this.colors.primary).alpha(.1))
  }

  draw(value, topV) {
    const f = x => x - (x % 10) + 50
    const topValue = topV || Math.max(...this.values.map(v => f(v)))
    const ctx = this.canvas.getContext('2d')

    ctx.clearRect(0, 0, ...this.size)

    ctx.fillStyle = 'black'

    ctx.fillRect(this.left, 0, this.size[0] - this.left, this.size[1] - this.top)

    ctx.font = '10px "Poppins"'
    ctx.fillStyle = 'white'

    ctx.textAlign = 'right'

    ctx.textBaseline = 'top'
    ctx.fillText(topValue, this.left - 4, 2)

    const avg = this.values.reduce((a, b) => a + b, 0) / this.values.length
    
    const averageVal = f(avg)

    const averageY = convertRange(averageVal, [topValue, 0], [0, this.size[1] - this.top])

    ctx.textBaseline = 'middle'
    ctx.fillText(averageVal, this.left - 4, averageY)

    ctx.textBaseline = 'bottom'
    ctx.fillText('0', this.left - 4, this.size[1] - this.top - 2)


    ctx.fillStyle = 'black'
    ctx.fillRect(this.left, 0, this.size[0] - this.left, this.size[1] - this.top)

    ctx.strokeStyle = this.colors.secondary
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(this.left, averageY)
    ctx.lineTo(this.size[0], averageY)
    ctx.stroke()

    const y = convertRange(value, [topValue, 0], [0, this.size[1] - this.top])

    ctx.strokeStyle = this.colors.third
    ctx.beginPath()
    ctx.moveTo(this.left, y)
    ctx.lineTo(this.size[0], y)
    ctx.stroke()

    ctx.strokeStyle = this.colors.primary
    ctx.globalAlpha = .8
    ctx.beginPath()

    let fy = 0
    for (let i = 0; i < this.values.length; i++) {
      const val = this.values[i]
      const vy = convertRange(val, [topValue, 0], [0, this.size[1] - this.top])
      if (i === 0) {
        // ctx.moveTo(this.left + 1, vy)
        fy = vy
      }
      ctx.lineTo(this.left + 1 + i, vy)
      if (i === this.values.length - 1) {
        ctx.stroke()
        ctx.lineTo(this.left + 1 + i, this.size[1] - this.top)
      }
    }


    ctx.lineTo(this.left + 1, this.size[1] - this.top)
    ctx.lineTo(this.left + 1, fy)

    ctx.globalAlpha = 1
    ctx.fillStyle = this.grad
    ctx.fill()

    ctx.clearRect(0, this.size[1] - this.top, this.size[0] / 2, this.top)

    ctx.fillStyle = this.colors.third
    ctx.font = '22px "Poppins"'
    ctx.textAlign = 'left'
    ctx.fillText(this.label(~~value), this.left, this.size[1] - 2)

    ctx.textAlign = 'right'
    if (this.c > 50) {
      this.c = 0
      this.cVal = avg
    }
    this.c++

    ctx.clearRect(this.size[0] / 2, this.size[1] - this.top, this.size[0] / 2, this.top)
    ctx.fillText(this.label(~~this.cVal), this.size[0] - 2, this.size[1] - 2)
  }
}
