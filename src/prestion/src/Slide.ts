/* eslint-disable @typescript-eslint/no-unused-vars */
import * as PIXI from 'pixi.js'
import { PrestionProject } from '.'
import { SlideInsideOptions, SlideOptions, StateObject, StateTypeAsString } from './typings'

export default class Slide<
  P extends PrestionProject,
  S extends StateObject = StateObject
> {
  public readonly engine: P
  public readonly container: PIXI.Container
  public readonly index: number

  private _state?: Record<string, unknown>
  private _cachedState?: Record<string, unknown>
  private _stateDefined: boolean
  public _defaultState?: Record<string, unknown>
  public stateTypes: Record<keyof S, StateTypeAsString>

  private readonly _options: SlideOptions

  constructor (
    { prestion, index }: SlideInsideOptions<P>,
    options: SlideOptions
  ) {
    this.engine = prestion
    this._options = options

    this.container = new PIXI.Container()
    this.container.name = `Slide - ${options.id}`

    this.visible = false
    this.index = index

    this._state = {}
    this.stateTypes = {} as Record<keyof S, StateTypeAsString>
    this._cachedState = {}
    this._stateDefined = false
    this._defaultState = {}
  }

  get resources () {
    return this.engine.resources
  }

  get id () {
    return this._options.id
  }

  /**
   * Event triggered on the initialization of the project.
   */
  onPreLoad () {
    this._state = this.state
    this._defaultState = { ...this._state }
    this._state = { ...this._state, ...this._cachedState }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this

    this.state = new Proxy(this._state, {
      set: (target, p, value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[p] = value
        this.engine.onStateUpdate(that)
        this.onStateUpdate()
        return true
      }
    }) as S
    this._stateDefined = true
  }

  get state (): S {
    return this._state as S
  }

  set state (value) {
    if (!this._stateDefined) {
      this._state = value
    } else {
      throw new Error('The state was already defined.') // TODO: Merge the value with the state instead of throwing an error
    }
  }

  get globalState () {
    return this.engine.state
  }

  /**
   * Load function added to the Loader. This can do extensive tasks on the loading process.
   * @returns {Promise<void>}
   */
  async load () {
    // Load event
  }

  /**
   * Event triggered when the loader finishes loading everything.
   */
  onPostLoad () {
    // Post load event
  }

  _onStateUpdate () {
    this.onStateUpdate()
    this.engine.onStateUpdate(this)
  }

  /**
   * Event triggered when the shared state is changed.
   */
  onStateUpdate () {
    // I don't remember what this does actually
  }

  onPreStart () {
    // Pre start event
  }

  onStart () {
    // Start event
  }

  onPreEnd () {
    // Pre end event
  }

  onEnd () {
    // End event
  }

  /**
   * Event triggered when a 'windowResize' happens on the browser.
   * @param {number} width
   * @param {number} height
   */
  onWindowResize (width: number, height: number) {
    // Window resize event
  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   */
  createStartTimeline (tl: GSAPTimeline) {
    // Start timeline
  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   */
  createEndTimeline (tl: GSAPTimeline) {
    // End timeline
  }

  get visible () {
    return this.container.visible
  }

  set visible (value) {
    this.container.visible = value
  }
}
