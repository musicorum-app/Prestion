import { PrestionProject } from "@musicorum/prestion";
import IntroSlide from "./slides/intro";
import TestSlide from "./slides/test";
import { PrestionTools } from "@musicorum/prestion-tools";
import * as PIXI from "pixi.js";
import chroma from "chroma-js";
import { getWindowSize } from "@musicorum/prestion/utils";

export default class ExampleProject extends PrestionProject {
  constructor() {
    super({
      name: 'Prestion Example',
      slides: [
        IntroSlide,
        TestSlide
      ],
      plugins: [
        PrestionTools
      ],
      element: '.prestion'
    })

    this.state = {
      backgroundColor: '#26dce2'
    }

    this.stateTypes = {
      backgroundColor: 'color'
    }
  }

  onPreLoad() {
    const bg = new PIXI.Graphics()

    this.stage.addChild(bg)


    this.items = {
      bg
    }
    this.updateBgColor()
  }

  updateBgColor() {
    const [width, height] = getWindowSize()

    this.items.bg.clear()
      .beginFill(chroma(this.state.backgroundColor).num())
      .drawRect(0, 0, width, height)
      .endFill()
  }

  onGlobalStateUpdate () {
    super.onGlobalStateUpdate()

    this.updateBgColor()
  }

  onWindowResize(width, height) {
    super.onWindowResize(width, height);

    this.updateBgColor()
  }
}
