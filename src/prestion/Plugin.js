export default class Plugin {
  constructor({prestion}, config) {
    this.engine = prestion
    this._config = config
  }

  onPreLoad () {

  }

  async load () {

  }

  onPostLoad() {

  }

  onStart () {

  }

  /**
   *
   * @param {Slide} target
   */
  onPreNextSlide(target) {

  }

  onNextSlide () {

  }

  /**
   *
   * @param {Slide} target
   */
  onPreBackSlide (target) {

  }

  onBackSlide () {

  }

  onTransition () {

  }
}
