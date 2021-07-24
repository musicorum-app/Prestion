import Graph from "./Graph";

export default class MemoryGraph extends Graph {
  constructor() {
    super('Memory (MB)', {
      primary: '#2DC791',
      secondary: '#05a1fd',
      third: '#e2b028'
    })
    this.last = 0
    this.label = v => `${v} MB`
  }

  update() {
    const now = performance.now()
    
    const used = this.convertBytesIntoMB(performance.memory.usedJSHeapSize)

    this.draw(used)
    this.values.push(used)
    this.values = this.values.slice(-(this.size[0] - this.left))
    this.last = now
  }

  convertBytesIntoMB(bytes) {
    return (bytes / 1024 / 1024)
  }
}
