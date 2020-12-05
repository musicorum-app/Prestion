import Utils from "../Utils";
import chroma from 'chroma-js'

export default class Graph {
  constructor(name, colors) {
    this.name = name
    this.colors = colors
    this.size = [200, 100]
    this.top = 32
    this.left = 20
    this.values = []
    this.c = 60
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
    ctx.fillStyle = 'black'

    ctx.fillRect(this.left, 0, this.size[0] - this.left, this.size[1] - this.top)

    ctx.font = '10px "Poppins Regular"'
    ctx.fillStyle = 'white'

    ctx.textAlign = 'right'

    ctx.textBaseline = 'top'
    ctx.fillText('100', this.left - 4, 2)

    const y60fps = Utils.convertRange(60, [100, 0], [0, this.size[1] - this.top])

    ctx.textBaseline = 'middle'
    ctx.fillText('60', this.left - 4, y60fps)

    ctx.textBaseline = 'bottom'
    ctx.fillText('0', this.left - 4, this.size[1] - this.top - 2)
    ctx.globalAlpha = .1

    this.drawGraphBase(ctx)

    this.canvas = canvas

    this.grad = ctx.createLinearGradient(0, 0, 0, this.size[1])
    this.grad.addColorStop(0, chroma(this.colors.primary).alpha(.4))
    this.grad.addColorStop(1, chroma(this.colors.primary).alpha(.1))
  }

  drawGraphBase(ctx) {
    const y60fps = Utils.convertRange(60, [100, 0], [0, this.size[1] - this.top])

    ctx.strokeStyle = this.colors.secondary
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(this.left, y60fps)
    ctx.lineTo(this.size[0], y60fps)
    ctx.stroke()

  }

  draw(value) {
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(this.left, 0, this.size[0] - this.left, this.size[1] - this.top)

    this.drawGraphBase(ctx)

    const y = Utils.convertRange(value, [100, 0], [0, this.size[1] - this.top])

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
      const vy = Utils.convertRange(val, [100, 0], [0, this.size[1] - this.top])
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
    ctx.font = '22px "Poppins Regular"'
    ctx.textAlign = 'left'
    ctx.fillText(value.toFixed(1), this.left, this.size[1] - 2)

    ctx.textAlign = 'right'
    if (this.c > 50) {
      ctx.clearRect(this.size[0] / 2, this.size[1] - this.top, this.size[0] / 2, this.top)
      ctx.fillText(value.toFixed(1), this.size[0] - 2, this.size[1] - 2)
      this.c = 0
    }
    this.c++
  }
}