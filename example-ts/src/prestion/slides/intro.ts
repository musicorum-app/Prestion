import { Slide, SlideInsideOptions, StateObject } from "@musicorum/prestion";
import ExampleProject from "../project";
import * as PIXI from 'pixi.js'
import {gsap} from 'gsap'

export interface IntroSlideState extends StateObject {
  title: string,
  boldText: boolean,
  showImage: boolean
}

interface ItemsType {
  txt: PIXI.Text,
  img: PIXI.Sprite
}

export default class IntroSlide extends Slide<ExampleProject, IntroSlideState> {
  items?: ItemsType

  constructor(p: SlideInsideOptions<ExampleProject>) {
    super(p, {
      id: 'intro',
      name: 'Intro Slide'
    })

    this.state = {
      title: 'Welcome to Prestion',
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
    super.onPreLoad()

    this.engine.addImageToLoader('artist', 'https://i.scdn.co/image/ab6761610000e5eba77c728ec1fa549d304ad4f0')
  }

  onPostLoad() {
    super.onPostLoad()

    const texture = PIXI.Texture.from((this.resources?.artist as any).data as HTMLImageElement)
    const img = new PIXI.Sprite(texture)
    img.position.set(200, 200)

    this.container.addChild(img)

    const txt = new PIXI.Text(this.state.title, new PIXI.TextStyle({
      fill: 0,
      fontSize: 40
    }))

    txt.alpha = 0
    txt.position.set(200, 200)
    this.container.addChild(txt)

    this.items = {
      txt,
      img
    }
  }

  createStartTimeline(tl: GSAPTimeline) {
    if (!this.items) return
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

  createEndTimeline(tl: GSAPTimeline) {
    console.log('End!')
  }

  onStateUpdate() {
    super.onStateUpdate()
    if (!this.items) return

    this.items.txt.text = this.state.title
    this.items.txt.style.fontWeight = this.state.boldText ? 'bold' : 'normal'
    this.items.img.visible = this.state.showImage
  }
}