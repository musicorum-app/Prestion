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

    this.init()
  }

  async load () {
    this.preLoad()
    console.log(2)
    await this.loader.load()
    this.postLoad()
  }

  postLoad() {
    console.log(23)
    this.engine.postLoad()
  }

  preLoad() {

  }

  start() {
    this.engine.start()
  }

  onWindowResize() {

  }

  init () {
    this.engine.init()
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

  update () {

  }
}
