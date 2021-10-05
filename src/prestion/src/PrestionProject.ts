import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { PluginConstructor, PrestionProjectConfig, PrestionProjectConfigOptionals, SlideConstructor, StateObject, StateTypeAsString } from './typings'
import { Plugin, Slide } from '.'

const defaultConfig: PrestionProjectConfig = {
  name: 'Unnamed project',
  element: 'body'
}

/**
 * @prop {Slide[]} slides
 */
export default class PrestionProject<G extends StateObject = StateObject> {
  public readonly config: PrestionProjectConfig
  public readonly name: string
  public readonly element: HTMLElement
  public readonly version: string
  public resources: Record<string, unknown> | null

  public readonly slides: Slide<PrestionProject>[]
  public readonly plugins: Map<string, Plugin<PrestionProject>>

  public readonly loader: PIXI.Loader
  public readonly slidesContainer: PIXI.Container
  public app: PIXI.Application

  private _state?: Record<string, unknown>
  private _cachedState?: Record<string, unknown>
  private _stateDefined: boolean
  public _defaultState?: Record<string, unknown>
  public stateTypes: Record<keyof G, StateTypeAsString>

  private _currentSlide: number
  private _canMove: boolean

  constructor (config: PrestionProjectConfigOptionals = {}) {
    this.config = { ...defaultConfig, ...config }
    this.name = this.config.name

    this.version = '2.0.0'

    const element = config.element
    if (typeof element === 'string') {
      const el = document.querySelector(element) as HTMLElement
      if (!el) {
        throw new Error(`The element ${element} was not found.`)
      }

      this.element = el
    } else if (element instanceof HTMLElement) {
      this.element = element
    } else throw new Error('The element must be a string or an HTMLElement')

    this.loader = new PIXI.Loader()
    this.resources = null
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      autoStart: false,
      antialias: true,
      resolution: window.devicePixelRatio
    })

    this.slides = []
    this.plugins = new Map()
    this.slidesContainer = new PIXI.Container()

    this._currentSlide = 0
    this._canMove = false

    this._state = {}
    this.stateTypes = {} as Record<keyof G, StateTypeAsString>
    this._cachedState = {}
    this._stateDefined = false
    this._defaultState = {}
  }

  /* Getters 'n stuff */

  /**
   * The current active slide
   * @returns {Slide}
   */
  get currentSlide () {
    return this.slides[this._currentSlide]
  }

  get previousSlide (): Slide<PrestionProject> | undefined {
    return this.slides[this._currentSlide - 1]
  }

  /**
   * The next slide referring to the current, or undefined
   */
  get nextSlide (): Slide<PrestionProject> | undefined {
    return this.slides[this._currentSlide + 1]
  }

  get canMove () {
    return this._canMove
  }

  set canMove (value) {
    this._canMove = value
    this.onCanMoveValueChange(value)
  }

  get stage () {
    return this.app?.stage
  }

  get state (): G {
    return this._state as G
  }

  set state (value) {
    if (!this._stateDefined) {
      this._state = value
    } else {
      throw new Error('The state was already defined.') // TODO: Merge the value with the state instead of throwing an error
    }
  }

  addImageToLoader (label: string, url: string) {
    this.loader.add(label, url, {
      loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
      xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB
    })
  }

  /* Events */

  /**
   * Trigger an event to every loaded plugin
   * @param {string} event - The function to run
   * @param {any[]} args - The params for the function
   */
  triggerPluginEvent (event: string, ...args: unknown[]) {
    for (const plugin of this.plugins.values()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugin[event](...args)
    }
  }

  /**
   * Trigger an event to every loaded slide
   * @param {string} event - The function to run
   * @param {any[]} args - The params for the function
   */
  triggerSlideEvent (event: string, ...args: unknown[]) {
    for (const slide of this.slides) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      slide[event](...args)
    }
  }

  onPreLoad () {
    // PreLoad event
  }

  /**
   * Event triggered when the canMove value changes
   * @param {boolean} value
   */
  onCanMoveValueChange (value: boolean) {
    this.triggerPluginEvent('onCanMoveValueChange', value)
  }

  /**
   *
   * @param {Slide} slide
   */
  onStateUpdate (slide: Slide<PrestionProject>) {
    this.triggerPluginEvent('onStateUpdate', slide)
  }

  /**
   * Event triggered when the engine's state is changed
   */
  onGlobalStateUpdate () {
    this.triggerPluginEvent('onGlobalStateUpdate')
  }

  /**
   * Event triggered when the window is resized
   * @param {number} width - The inner window width
   * @param {number} height - The inner window height
   */
  onWindowResize (width: number, height: number) {
    this.app?.renderer.resize(width, height)
    this.triggerSlideEvent('onWindowResize', width, height)
  }

  onWheelEvent (event: WheelEvent) {
    if (!this.canMove) return
    try {
      if (event.deltaY > 0) {
        this.next()
      } else {
        this.back()
      }
    } catch (e) {
      console.log(e)
    }
  }

  /* Methods */
  addSlides (...slides: SlideConstructor<PrestionProject>[]) {
    for (let i = 0; i < slides.length; i++) {
      const Slide = slides[i]
      const slide = new Slide({
        prestion: this as PrestionProject,
        index: i
      })
      this.slides.push(slide)
    }
  }

  addPlugins (...plugins: PluginConstructor<PrestionProject>[]) {
    for (const Plugin of plugins) {
      const plugin = new Plugin(this)

      this.plugins.set(plugin.constructor.name, plugin)
    }
  }

  async load () {
    this.slidesContainer.name = 'Slides'

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.__PIXI_INSPECTOR_GLOBAL_HOOK__) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI })
    }

    this.onPreLoad()

    this.triggerPluginEvent('onPreLoad')
    for (const slide of this.slides) {
      slide.onPreLoad()
      this.slidesContainer.addChild(slide.container)
    }

    this.element.append(this.app.view)

    this.app.stage.addChild(this.slidesContainer)

    await Promise.all([...this.plugins.values()].map(s => s.load()))

    await Promise.all(this.slides.map(s => s.load()))

    return new Promise<void>(resolve => {
      this.loader.load((_, resources) => {
        this.resources = resources

        this.triggerPluginEvent('onPostLoad')
        this.triggerSlideEvent('onPostLoad')

        resolve()
      })
    })
  }

  private initEvents () {
    window.addEventListener('resize', () => {
      this.onWindowResize(window.innerWidth, window.innerHeight)
    })

    window.addEventListener('wheel', event => {
      this.onWheelEvent(event)
    })
  }

  start () {
    console.log(
      `%c %c Prestion engine ${this.version} %c `,
      'background: #fe4195; padding-left: 4px',
      'background: linear-gradient(90deg, #fdaf67, #b851e3); color: white; font-family: monospace',
      'background: #26dce2; padding-left: 4px'
    )

    this.initEvents()

    this.app.start()

    this.startStates()

    this.onStart()
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

  onStart () {
    // Start event
  }

  startStates () {
    this._state = { ...this.state, ...this._cachedState }
    this._defaultState = { ...this._state }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.state = new Proxy(this._state, {
      set: (target, p, value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[p] = value
        this.onGlobalStateUpdate()
        return true
      }
    })

    this._stateDefined = true
  }

  back () {
    if (!this.canMove) return

    this.canMove = false
    const { previousSlide, currentSlide } = this

    if (!previousSlide) return

    this.triggerPluginEvent('onPreBackSlide', previousSlide)

    currentSlide.onPreEnd()

    previousSlide.visible = true
    previousSlide.onPreStart()

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.triggerPluginEvent('onBackSlide')

        currentSlide.visible = false
        currentSlide.onEnd()
        previousSlide.onStart()
        setTimeout(() => {
          this.canMove = true
        }, 400)
      }
    })

    currentSlide.createEndTimeline(tl)

    tl.addLabel('Transition')

    tl.add(() => {
      this._currentSlide--
      this.triggerPluginEvent('onTransition')
    })

    previousSlide.createStartTimeline(tl)

    tl.play()
  }

  next () {
    if (!this.canMove) return

    this.canMove = false
    const { currentSlide, nextSlide } = this

    if (!nextSlide) return

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
        setTimeout(() => {
          this.canMove = true
        }, 400)
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

  dispose () {
    this.app.destroy(true)
    this.triggerPluginEvent('onDispose')
  }
}
