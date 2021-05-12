import {PrestionProject, Utils} from "@musicorum/prestion";
import * as PIXI from 'pixi.js'

export default class PixiPrestionProject extends PrestionProject {
  init() {
    super.init()

    window.PIXI = PIXI
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // this.app.ticker.maxFPS = 144

    this.app.ticker.stop()

    this.content = new PIXI.Container
    this.content.name = 'Content'

    this.slidesContainer = new PIXI.Container()
    this.slidesContainer.name = 'SlidesContainer'
    this.content.addChild(this.slidesContainer)

    this.overlay = new PIXI.Container()
    this.overlay.name = 'Overlay'

    this.app.stage.addChild(this.content)
    this.app.stage.addChild(this.overlay)

    window.addEventListener('resize', () => {
      this.app.renderer.resize(...Utils.getWindowSize())
    })

    this.element.appendChild(this.app.view)
  }

  preLoad() {
    this.loader.addCustom(() => new Promise(resolve => {
      this.app.loader.load((_, resources) => {
        this.resources = resources
        resolve()
      })
    }))
  }

  update() {
    this.app.ticker.update()
  }
}
