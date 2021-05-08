import {PrestionProject, Slide} from "@musicorum/prestion";
import * as PIXI from 'pixi.js'

export class PixiPrestionProject extends PrestionProject {
  app: PIXI.Application

  content: PIXI.Container
  slidesContainer: PIXI.Container
  overlay: PIXI.Container
}


export class PixiSlide extends Slide {
  stage: PIXI.Container
}
