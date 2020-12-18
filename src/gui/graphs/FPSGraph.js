import Graph from "../Graph";

export default class FPSGraph extends Graph {
  constructor(name, colors) {
    super(name, colors);
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