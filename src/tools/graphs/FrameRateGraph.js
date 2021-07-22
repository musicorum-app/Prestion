import Graph from "./Graph";

export default class FrameRateGraph extends Graph {
  constructor() {
    super('FPS', {
      primary: '#d73cea',
      secondary: '#fcf84a',
      third: '#05c1fd'
    })
    this.last = 0
  }

  update() {
    const now = performance.now()
    const delta = now - this.last
    const fps = 1000 / delta;
    this.draw(fps)
    this.values.push(fps)
    this.values = this.values.slice(-(this.size[0] - this.left))
    this.last = now
  }
}
