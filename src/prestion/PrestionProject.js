import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import {version} from './package.json'

export default class PrestionProject {
  constructor(config) {
    this.config = config
    this.name = config.name

    const element = config.element
    if (typeof element === 'string') {
      this.element = document.querySelector(element)
    } else {
      this.element = element
    }

    this.loader = new PIXI.Loader()
    this.resources = null

    this.slides = []

    this._currentSlide = 0
    this._canMove = false

    this.initSlides()
  }

  /* Getters 'n stuff */
  get currentSlide() {
    return this.slides[this._currentSlide]
  }

  get canMove() {
    return this._canMove
  }

  set canMove(value) {
    this._canMove = value
    this.onCanMoveValueChange(value)
  }

  /* Events */

  /**
   * Event triggered when the canMove value changes
   * @param {boolean} value
   */
  onCanMoveValueChange(value) {

  }

  /**
   * Event triggered when the window is resized
   * @param {number} width - The inner window width
   * @param {number} height - The inner window height
   */
  onWindowResize(width, height) {
    this.app.renderer.resize(width, height)
    for (const slide of this.slides) {
      slide.onWindowResize(width, height)
    }
  }

  /* Methods */
  initSlides() {
    for (const Slide of this.config.slides) {
      const slide = new Slide(this)
      this.slides.push(slide)
    }
  }

  async load() {
    const slidesContainer = new PIXI.Container()
    slidesContainer.name = 'Slides'

    for (const slide of this.slides) {
      slide.onPreLoad()
      slidesContainer.addChild(slide.stage)
    }

    window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
    window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI: PIXI})

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      autoStart: false,
      antialias: true,
      resolution: window.devicePixelRatio
    })

    if (!this.element) throw new Error('The element could not be found.')

    this.element.append(this.app.view)

    this.app.stage.addChild(slidesContainer)

    await Promise.all(this.slides.map(s => s.load()))

    return new Promise(resolve => {
      this.loader.load((_, resources) => {
        this.resources = resources


        for (const slide of this.slides) {
          slide.onPostLoad()
        }

        resolve()
      })
    })
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.onWindowResize(window.innerWidth, window.innerHeight)
    })
  }

  start() {
    console.log(
      `%c %c Prestion engine ${version} %c `,
      'background: #fe4195; padding-left: 4px',
      'background: linear-gradient(90deg, #fdaf67, #b851e3); color: white; font-family: monospace',
      'background: #26dce2; padding-left: 4px'
    )

    this.initEvents()

    this.app.start()

    this.startSlide(this.currentSlide)
  }

  nextSlide() {
    this.endSlide(this.currentSlide)
  }

  /**
   * Do the start animation on the slide
   * @param {Slide} slide
   */
  startSlide(slide) {
    slide.visible = true
    slide.onPreStart()

    const tl = gsap.timeline({
      paused: true,
    })

    slide.createStartTimeline(tl, () => {
      slide.onStart()
    })
    tl.play()
  }

  /**
   * Do the ending animation on the slide
   * @param {Slide} slide
   */
  endSlide(slide) {
    slide.onPreEnd()
    const tl = gsap.timeline({
      paused: false
    })

    slide.createEndTimeline(tl, () => {
      this._currentSlide++
      this.startSlide(this.currentSlide)
    })
    tl.play()
  }
}
