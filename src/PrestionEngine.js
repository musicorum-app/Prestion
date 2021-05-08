import Utils from "./Utils";
import PrestionGUI from "./gui";
import { gsap }  from 'gsap'

export default class PrestionEngine {
  constructor(project) {
    this.project = project
    this.element = project.element
    this.slides = []
    this.activeSlide = 0
    this.windowSize = Utils.getWindowSize()
    this.valueStores = {}
    this.transitioning = false
  }

  preLoad() {
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


  createGUI() {
    this.gui = new PrestionGUI(this.element, this)
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      this.project.onWindowResize()
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
    if (this.transitioning) return
    if (this.activeSlide === this.slides.length - 1) return

    this.transitioning = true

    this.currentSlide.out(this.createContext())

    const outTl = this.currentSlide.createOutTimeline() || gsap.timeline()
    const inTl = this.slides[this.activeSlide + 1].createInTimeline() || gsap.timeline()

    outTl.to({}, {
      onComplete: () => {
        this.activeSlide++
        this.currentSlide.in(this.createContext())
      }
    })
    outTl.add(inTl)

    outTl.play(0)
    outTl.resume(0)
    console.log(outTl)
    outTl.eventCallback('onComplete', () => {
      this.transitioning = false
      console.log('Transition done')
    })
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
