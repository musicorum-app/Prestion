import * as PIXI from 'pixi.js'
import {Slide} from "@musicorum/prestion";
import {getWindowSize} from "@musicorum/prestion/utils";
import chroma from "chroma-js";

export default class IntroSlide extends Slide {
  constructor(p) {
    super(p, {
      id: 'intro',
      name: 'Intro Slide',
    })

    this.state = {
      title: 'Prestion example',
      backgroundColor: '#26dce2'
    }

    this.defineStateTypes({
      title: 'string',
      backgroundColor: 'color'
    })
  }

  onPreLoad() {
    this.engine.loader.add('test', 'alo.png')
  }

  onPostLoad() {
    const bg = new PIXI.Graphics()


    this.stage.addChild(bg)


    const txt = new PIXI.Text(this.state.title, new PIXI.TextStyle({
      fill: 0,
      fontSize: 40
    }))

    txt.alpha = 0
    txt.position.set(200, 200)
    this.stage.addChild(txt)

    this.items = {
      txt,
      bg
    }
    this.updateBgColor()
  }

  onWindowResize(width, height) {
    this.updateBgColor()
  }

  createStartTimeline(tl) {
    tl.fromTo(this.items.txt, {
      alpha: 0,
      x: 300,
      y: 200
    },{
      alpha: 1,
      x: '620',
      y: '500',
      duration: 1.3,
      onStart: () => console.log('str')
    })
  }

  updateBgColor() {
    const [width, height] = getWindowSize()
    this.items.bg.clear()
      .beginFill(chroma(this.state.backgroundColor).num())
      .drawRect(0, 0, width, height)
      .endFill()
  }

  createEndTimeline(tl) {
    console.log('end')
  }

  onStateUpdate() {
    this.updateBgColor()
    this.items.txt.text = this.state.title
  }
}
