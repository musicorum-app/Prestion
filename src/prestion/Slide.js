import * as PIXI from 'pixi.js'

export default class Slide {
  constructor(prestion, config) {
    this.engine = prestion
    this._config = config

    this.stage = new PIXI.Container()
    this.stage.name = `Slide - ${config.id}`

    this.visible = false
  }

  /**
   * Event triggered on the initialization of the project.
   */
  onPreLoad () {

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
   * @param {Function} finish
   */
  createStartTimeline (tl, finish) {

  }

  /**
   * TODO
   * @param {GSAPTimeline} tl
   * @param {Function} finish
   */
  createEndTimeline (tl, finish) {

  }

  defineStateTypes() {

  }

  get visible () {
    return this.stage.visible
  }

  set visible (value) {
    this.stage.visible = value
  }
}
