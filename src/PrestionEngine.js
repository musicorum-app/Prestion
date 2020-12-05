import Utils from "./Utils";
import PrestionGUI from "./gui";

export default class PrestionEngine {
  constructor(element) {
    this.element = element
    this.slides = []
    this.activeSlide = 0
    this.windowSize = Utils.getWindowSize()
    this.valueStores = {}
  }

  preLoad() {
    this.canvas = this.createCanvas()
    this.setupListeners()
    this.element.appendChild(this.canvas)

    for (const slide of this.slides) {
      slide.load()
    }

    this.createGUI()
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

  createGUI() {
    this.gui = new PrestionGUI(this.element, this)
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      const [w, h] = Utils.getWindowSize()
      this.canvas.width = w
      this.canvas.height = h

      this.windowSize = [w, h]
    })

    window.addEventListener('wheel', ({ deltaY }) => {
      if (deltaY === 0) return
      if (deltaY > 0) this.nextSlide()
      else this.prevSlide()
    })
  }

  update(engine) {
    engine.slides[engine.activeSlide].update(engine.createContext())

    this.gui.fpsGraph.update()
    window.requestAnimationFrame(() => engine.update(engine))
  }

  addSlide(slide) {
    this.slides.push(slide)
  }

  prevSlide() {

  }

  nextSlide() {
    if (this.activeSlide === this.slides.length - 1) return
    this.currentSlide.out(this.createContext())
    this.activeSlide++
    this.currentSlide.in(this.createContext())
  }

  createContext() {
    return {
      engine: this,
      windowSize: this.windowSize,
      canvas: this.canvas
    }
  }

  defineStore(key, store) {
    this.valueStores[key] = store
  }

  get currentSlide() {
    return this.slides[this.activeSlide]
  }
}