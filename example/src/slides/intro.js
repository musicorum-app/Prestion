import * as PIXI from 'pixi.js'
import {Slide} from "@musicorum/prestion";
import {getWindowSize} from "@musicorum/prestion/utils";

export default class IntroSlide extends Slide {
  constructor(p) {
    super(p, {
      id: 'intro',
      name: 'Intro Slide',
    })

    this.state = {
      title: 'Prestion example',
      backgroundColor: '#ff0'
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
      .beginFill(0x26dce2)
      .drawRect(0, 0, ...getWindowSize())
      .endFill()

    this.stage.addChild(bg)


    const txt = new PIXI.Text('teste', new PIXI.TextStyle({
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
  }

  onWindowResize(width, height) {
    this.items.bg.beginFill(0x26dce2)
      .drawRect(0, 0, width, height)
      .endFill()
  }

  createStartTimeline(tl, finish) {
    tl.to(this.items.txt, {
      alpha: 1,
      y: '+=200',
      x: '+=320',
      duration: 1.3,
      onComplete: () => finish()
    })

    return tl
  }

  createEndTimeline(tl, finish) {
    console.log('end')
    finish()
  }
}
