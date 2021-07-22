import * as PIXI from 'pixi.js'

export default class Slide {
  constructor({prestion, index}, config) {
    this.engine = prestion
    this._config = config

    this.stage = new PIXI.Container()
    this.stage.name = `Slide - ${config.id}`

    this.visible = false
    this.index = index
    this.state = {}

    this._stateTypes = {}
  }

  /**
   * Event triggered on the initialization of the project.
   */
  onPreLoad () {
    this._state = this.state
    const that = this

    this.state = new Proxy(this._state, {
      set: (target, p, value) => {
        this.engine.onStateUpdate(that)
        target[p] = value
        return true
      }
    })
  }

  /**
   * Load function added to the Loader. This can do extensive tasks on the loading process.
   * @returns {Promise<void>}
   */
  async load () {

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
  onWindowResize (width, height) {

  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   */
  createStartTimeline (tl) {

  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   */
  createEndTimeline (tl) {

  }

  defineStateTypes(types) {
    this._stateTypes = types
  }

  get visible () {
    return this.stage.visible
  }

  set visible (value) {
    this.stage.visible = value
  }
}
