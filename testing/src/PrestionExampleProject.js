import {PrestionProject, Utils} from "@musicorum/prestion"
import * as PIXI from 'pixi.js'
import {PixiPrestionProject} from "@musicorum/prestion-pixi";

export default class PrestionExampleProject extends PixiPrestionProject {
  constructor() {
    super({
      element: '#prestion',
    })
  }

  init() {
    super.init();

    console.log(this)

    this.loader.addFont({
      name: 'Poppins SemiBold',
      url: '/assets/fonts/Poppins-SemiBold.ttf'
    })
  }
}
