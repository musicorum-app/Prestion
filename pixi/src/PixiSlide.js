import {Slide} from "@musicorum/prestion";
import * as PIXI from 'pixi.js'

export default class PixiSlide extends Slide {
  constructor(...p) {
    super(...p)

    this.stage = new PIXI.Container()
    this.stage.name = this.name
    this.project.slidesContainer.addChild(this.stage)
  }
}
