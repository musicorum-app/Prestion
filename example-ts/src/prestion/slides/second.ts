import { PrestionProject, Slide, utils } from "@musicorum/prestion";
import { SlideInsideOptions, StateObject } from "@musicorum/prestion/dist/src/typings";
import ExampleProject from "../project";
import * as PIXI from 'pixi.js'
import {gsap} from 'gsap'

export interface SecondSlideState extends StateObject {
  image: HTMLImageElement
}

interface ItemsType {
  image: PIXI.Sprite
}

export default class SecondSlide extends Slide<ExampleProject, SecondSlideState> {
  items?: ItemsType

  constructor(p: SlideInsideOptions<ExampleProject>) {
    super(p, {
      id: 'intro',
      name: 'Intro Slide'
    })

    this.state = {
      image: utils.BlankImage
    }

    this.stateTypes = {
      image: 'image'
    }
  }

  onPreLoad() {
    super.onPreLoad()

    this.engine.addImageToLoader('artist2', 'https://i.scdn.co/image/ab6761610000e5eb542bce36778c57b4abf80c88')
  }

  onPostLoad() {
    super.onPostLoad()

    const image = new PIXI.Sprite()
    image.position.set(280, 40)
    image.scale.set(0.8, 0.8)

    this.container.addChild(image)

    this.items = {
      image
    }

    
    if ('isBlank' in this.state.image) {
      this.state.image = (this.resources?.artist2 as any).data
    }
  }

  createStartTimeline(tl: GSAPTimeline) {
    tl.to(this.globalState, {
      backgroundColor: '#b851e3',
      duration: 1.3
    })
  }

  createEndTimeline (tl: GSAPTimeline) {
    tl.to(this.globalState, {
      backgroundColor: '#26dce2',
      duration: 1.3,
    })
  }

  onStateUpdate() {
    if (!this.items) return
    this.items.image.texture = PIXI.Texture.from(this.state.image)
  }

  onWindowResize(width: number, height: number) {
    super.onWindowResize(width, height)


  }
}