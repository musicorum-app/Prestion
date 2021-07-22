import {Slide} from "@musicorum/prestion";
import * as PIXI from "pixi.js";
import {getWindowSize} from "@musicorum/prestion/utils";
import gsap from "gsap";
import chroma from 'chroma-js'

export default class TestSlide extends Slide {
  constructor(p) {
    super(p, {
      id: 'test',
      name: 'Test slide'
    })

    this.state = {
      bgColor: '#26dce2'
    }

    this.defineStateTypes({
      bgColor: 'color'
    })
  }

  onPostLoad() {
    const bg = new PIXI.Graphics()

    this.stage.addChild(bg)

    this.items = {
      bg
    }

    this.updateBgColor()
  }

  onWindowResize(width, height) {
    this.updateBgColor()
  }

  createStartTimeline(tl) {
    tl.to(this.state, {
      bgColor: '#b851e3',
      duration: 1.3,
      onStart: () => {
        this.items.bg.visible = true
      },
      onUpdate: () => this.updateBgColor(),
    })
  }

  createEndTimeline (tl) {
    tl.to(this.state, {
      bgColor: '#26dce2',
      duration: 1.3,
      onComplete: () => {
        this.items.bg.visible = false
      },
      onUpdate: () => this.updateBgColor(),
    })
  }

  updateBgColor() {
    const [width, height] = getWindowSize()
    this.items.bg.clear()
      .beginFill(chroma(this.state.bgColor).num())
      .drawRect(0, 0, width, height)
      .endFill()
  }

  onStateUpdate() {
    this.updateBgColor()
  }
}
