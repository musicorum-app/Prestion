import * as PIXI from 'pixi.js'

export default class Slide {
  constructor({ prestion, index }, config) {
    this.engine = prestion
    this._config = config

    this.stage = new PIXI.Container()
    this.stage.name = `Slide - ${config.id}`

    this.visible = false
    this.index = index

    this.state = {}
    this.stateTypes = {}
    this._cachedState = {}
    this._stateDefined = false
    this._defaultState = {}

  }

  get resources() {
    return this.engine.resources
  }

  get id () {
    return this._config.id
  }

  /**
   * Event triggered on the initialization of the project.
   */
  _onPreLoad() {
    console.log(this._cachedState)
    this._state = this.state
    this._defaultState = {...this._state}
    this._state = {...this._state, ...this._cachedState}
    const that = this

    this.state = new Proxy(this._state, {
      set: (target, p, value) => {
        target[p] = value
        this.engine.onStateUpdate(that)
        this.onStateUpdate()
        return true
      }
    })
    this._stateDefined = true

    this.onPreLoad()
  }

  onPreLoad() {

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

  get globalState () {
    return this.engine.state
  }

  /**
   * Load function added to the Loader. This can do extensive tasks on the loading process.
   * @returns {Promise<void>}
   */
  async load() {

  }

  /**
   * Event triggered when the loader finishes loading everything.
   */
  onPostLoad() {

  }

  _onStateUpdate() {
    this.onStateUpdate()
    this.engine.onStateUpdate(this)
  }

  /**
   * Event triggered when the shared state is changed.
   */
  onStateUpdate() {

  }

  onPreStart() {

  }

  onStart() {

  }

  onPreEnd() {

  }

  onEnd() {

  }


  /**
   * Event triggered when a 'windowResize' happens on the browser.
   * @param {number} width
   * @param {number} height
   */
  onWindowResize(width, height) {

  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   */
  createStartTimeline(tl) {

  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   */
  createEndTimeline(tl) {

  }

  get visible() {
    return this.stage.visible
  }

  set visible(value) {
    this.stage.visible = value
  }
}
