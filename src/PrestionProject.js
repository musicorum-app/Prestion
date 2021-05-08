import Utils from "./Utils";
import PrestionEngine from "./PrestionEngine";
import ResourcesLoader from "./ResourcesLoader";

export default class PrestionProject {
  constructor(config) {
    const element = config.element
    if (typeof element === 'string') {
      this.element = document.querySelector(element)
    } else {
      this.element = element
    }

    this.engine = new PrestionEngine(this)
    this.loader = new ResourcesLoader(this)
  }

  async load () {
    await this.preLoad()
    return this.loader.load()
  }

  async preLoad() {

  }

  start() {
    this.engine.start()
  }

  onWindowResize() {

  }

  init () {

  }

  async loadFonts() {
    for (const {name, url} of this.fonts) {
      await Utils.loadFont(name, url)
    }
  }

  addSlide(...slides) {
    for (const slide of slides) {
      if (Array.isArray(slide)) {
        this.addSlide(...slide)
      } else {
        this.engine.addSlide(slide)
      }
    }
  }
}
