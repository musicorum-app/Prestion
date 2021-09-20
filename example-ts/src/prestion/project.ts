import { PrestionProject, PrestionUtils, StateObject } from "@musicorum/prestion"
import {PrestionToolkit} from "@musicorum/prestion-tools"
import IntroSlide from "./slides/intro"
import SecondSlide from "./slides/second"
import * as PIXI from 'pixi.js'
import chroma from "chroma-js"

interface ExampleProjectState extends StateObject {
  backgroundColor: string
}

interface ProjectItems {
  background: PIXI.Graphics
}

export default class ExampleProject extends PrestionProject<ExampleProjectState> {
  items?: ProjectItems

  constructor() {
    super({
      name: "ExampleProject",
      element: '.prestion'
    })

    this.state = {
      backgroundColor: '#26dce2'
    }

    this.stateTypes = {
      backgroundColor: 'color'
    }

    this.addPlugins(
      PrestionToolkit
    )

    this.addSlides(
      // @ts-ignore
      IntroSlide,
      SecondSlide
    )
  }

  onPreLoad () {
    super.onPreLoad()

    const background = new PIXI.Graphics()

    this.stage.addChild(background)

    this.items = {
      background
    }
    this.updateBackgroundColor()
  }

  updateBackgroundColor() {
    const [width, height] = PrestionUtils.getWindowSize()

    this.items?.background.clear()
    .beginFill(chroma(this.state.backgroundColor).num())
      .drawRect(0, 0, width, height)
      .endFill()
  }

  onGlobalStateUpdate() {
    super.onGlobalStateUpdate()

    this.updateBackgroundColor()
  }

  onWindowResize(width: number, height: number) {
    super.onWindowResize(width, height)

    this.updateBackgroundColor()
  }
}
