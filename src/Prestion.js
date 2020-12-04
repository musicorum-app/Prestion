import Utils from "./Utils";
import PrestionEngine from "./PrestionEngine";

export default class Prestion {
  constructor(element, config) {
    if (typeof element === 'string') {
      this.element = document.querySelector(element)
    } else {
      this.element = element
    }

    this.engine = new PrestionEngine(this.element)

    this.fonts = config.fonts
  }

  async preLoad() {
    await this.loadFonts()
    this.engine.preLoad()
  }

  start() {
    this.engine.start()
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