import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import {version} from './package.json'

const defaultConfig = {
  name: 'Unnamed project',
  slides: [],
  plugins: [],
  element: 'body'
}

/**
 * @prop {Slide[]} slides
 */
export default class PrestionProject {
  constructor(config) {
    this.config = {...defaultConfig, ...config}
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
    this.plugins = new Map()
    this.slidesContainer = null

    this._currentSlide = 0
    this._canMove = false

    this.state = {}
    this.stateTypes = {}
    this._cachedState = {}
    this._stateDefined = false
    this._defaultState = {}

    this.initPlugins()
    this.initSlides()
  }

  /* Getters 'n stuff */

  /**
   * The current active slide
   * @returns {Slide}
   */
  get currentSlide() {
    return this.slides[this._currentSlide]
  }

  /**
   * The previous slide referring to the current, or undefined
   * @returns {Slide|undefined}
   */
  get previusSlide() {
    return this.slides[this._currentSlide - 1]
  }

  /**
   * The next slide referring to the current, or undefined
   * @returns {Slide|undefined}
   */
  get nextSlide() {
    return this.slides[this._currentSlide + 1]
  }

  get canMove() {
    return this._canMove
  }

  set canMove(value) {
    this._canMove = value
    this.onCanMoveValueChange(value)
  }

  get stage() {
    return this.app?.stage
  }

  get state() {
    return this._state
  }

  set state(value) {
    if (!this._stateDefined) {
      this._state = value
    } else {
      throw new Error('The state was already defined.') // TODO: Merge the value with the state instead of throwing an error
    }
  }

  /* Events */

  /**
   * Trigger an event to every loaded plugin
   * @param {string} event - The function to run
   * @param {any} args - The params for the function
   */
  triggerPluginEvent(event, ...args) {
    for (const plugin of this.plugins.values()) {
      plugin[event](...args)
    }
  }

  /**
   * Trigger an event to every loaded slide
   * @param {string} event - The function to run
   * @param {any} args - The params for the function
   */
  triggerSlideEvent(event, ...args) {
    for (const slide of this.slides) {
      slide[event](...args)
    }
  }

  onPreLoad() {

  }

  /**
   * Event triggered when the canMove value changes
   * @param {boolean} value
   */
  onCanMoveValueChange(value) {
    this.triggerPluginEvent('onCanMoveValueChange', value)
  }

  /**
   *
   * @param {Slide} slide
   */
  onStateUpdate(slide) {
    this.triggerPluginEvent('onStateUpdate', slide)
  }

  /**
   * Event triggered when the engine's state is changed
   */
  onGlobalStateUpdate() {
    this.triggerPluginEvent('onGlobalStateUpdate')
  }

  /**
   * Event triggered when the window is resized
   * @param {number} width - The inner window width
   * @param {number} height - The inner window height
   */
  onWindowResize(width, height) {
    this.app.renderer.resize(width, height)
    this.triggerSlideEvent('onWindowResize', width, height)
  }

  /* Methods */
  initSlides() {
    for (let i = 0; i < this.config.slides.length; i++) {
      const Slide = this.config.slides[i]
      const slide = new Slide({
        prestion: this,
        index: i
      })
      this.slides.push(slide)
    }
  }

  initPlugins() {
    for (const Plugin of this.config.plugins) {
      const plugin = new Plugin({
        prestion: this
      })

      this.plugins.set(plugin.constructor.name, plugin)
    }
  }

  async load() {
    const slidesContainer = new PIXI.Container()
    this.slidesContainer = slidesContainer
    slidesContainer.name = 'Slides'


    window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
    window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI: PIXI})

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      autoStart: false,
      antialias: true,
      resolution: window.devicePixelRatio
    })

    this.onPreLoad()

    this.triggerPluginEvent('onPreLoad')
    for (const slide of this.slides) {
      slide._onPreLoad()
      slidesContainer.addChild(slide.stage)
    }

    if (!this.element) throw new Error('The element could not be found.')

    this.element.append(this.app.view)

    this.app.stage.addChild(slidesContainer)

    await Promise.all([...this.plugins.values()].map(s => s.load()))

    await Promise.all(this.slides.map(s => s.load()))

    return new Promise(resolve => {
      this.loader.load((_, resources) => {
        this.resources = resources

        this.triggerPluginEvent('onPostLoad')
        this.triggerSlideEvent('onPostLoad')

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

    this.startStates()

    this.triggerPluginEvent('onStart')

    this.currentSlide.visible = true
    this.currentSlide.onPreStart()

    const tl = gsap.timeline({
      onComplete: () => {
        this.canMove = true
      }
    })

    this.currentSlide.createStartTimeline(tl)
  }

  startStates() {
    this._state = {...this.state, ...this._cachedState}
    this._defaultState = {...this._state}

    this.state = new Proxy(this._state, {
      set: (target, p, value) => {
        target[p] = value
        this.onGlobalStateUpdate()
        return true
      }
    })

    this._stateDefined = true
  }

  back() {
    if (!this.canMove) return

    this.canMove = false
    const {previusSlide, currentSlide} = this

    this.triggerPluginEvent('onPreBackSlide', previusSlide)

    currentSlide.onPreEnd()

    previusSlide.visible = true
    previusSlide.onPreStart()

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.triggerPluginEvent('onBackSlide')

        currentSlide.visible = false
        currentSlide.onEnd()
        previusSlide.onStart()
        this.canMove = true
      }
    })

    currentSlide.createEndTimeline(tl)

    tl.addLabel('Transition')

    tl.add(() => {
      this._currentSlide--
      this.triggerPluginEvent('onTransition')
    })

    previusSlide.createStartTimeline(tl)

    tl.play()
  }

  next() {
    if (!this.canMove) return

    this.canMove = false
    const {currentSlide, nextSlide} = this

    this.triggerPluginEvent('onPreNextSlide', nextSlide)

    currentSlide.onPreEnd()

    nextSlide.visible = true
    nextSlide.onPreStart()

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.triggerPluginEvent('onNextSlide')

        currentSlide.visible = false
        currentSlide.onEnd()
        nextSlide.onStart()
        this.canMove = true
      }
    })

    currentSlide.createEndTimeline(tl)

    tl.addLabel('Transition')

    tl.add(() => {
      this._currentSlide++
      this.triggerPluginEvent('onTransition')
    })

    nextSlide.createStartTimeline(tl)

    tl.play()
  }
}
