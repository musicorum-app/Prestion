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
      boldText: false,
      showImage: true
    }

    this.stateTypes = {
      title: 'string',
      boldText: 'boolean',
      showImage: 'boolean'
    }
  }

  onPreLoad() {
    this.engine.loader.add('img', 'https://i.imgur.com/1QbyuDT.png')
  }

  onPostLoad() {
    const img = new PIXI.Sprite(this.resources.img.texture)
    img.position.set(200, 200)

    this.stage.addChild(img)


    const txt = new PIXI.Text(this.state.title, new PIXI.TextStyle({
      fill: 0,
      fontSize: 40
    }))

    txt.alpha = 0
    txt.position.set(200, 200)
    this.stage.addChild(txt)

    this.items = {
      txt,
      img
    }
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


  createEndTimeline(tl) {
    console.log('end')
  }

  onStateUpdate() {
    this.items.txt.text = this.state.title

    this.items.txt.style.fontWeight = this.state.boldText ? 'bold' : 'normal'

    this.items.img.visible = this.state.showImage
  }
}

