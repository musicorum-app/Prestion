import Utils from "./Utils";

export default class PrestionEngine {
  constructor(element) {
    this.element = element
    this.slides = []
    this.activeSlide = 0
    this.windowSize = Utils.getWindowSize()
  }

  preLoad() {
    this.canvas = this.createCanvas()
    this.setupListeners()
    this.element.appendChild(this.canvas)

    for (const slide of this.slides) {
      slide.load()
    }
  }

  start () {
    this.update(this)
    setTimeout(() => {
      this.slides[this.activeSlide].timeline.resume()
    }, 700)
  }

  createCanvas() {
    const el = document.createElement('canvas')
    const [w, h] = Utils.getWindowSize()
    el.width = w
    el.height = h

    return el
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      const [w, h] = Utils.getWindowSize()
      this.canvas.width = w
      this.canvas.height = h

      this.windowSize = [w, h]
    })
  }

  update(engine) {
    engine.slides[engine.activeSlide].update(engine.createContext())

    window.requestAnimationFrame(() => engine.update(engine))
  }

  addSlide(slide) {
    this.slides.push(slide)
  }

  createContext() {
    return {
      engine: this,
      windowSize: this.windowSize,
      canvas: this.canvas
    }
  }
}