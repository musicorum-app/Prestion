import {Slide} from "@musicorum/prestion";
import * as PIXI from 'pixi.js'
import {BlankImage} from "@musicorum/prestion/utils";

export default class TestSlide extends Slide {
  constructor(p) {
    super(p, {
      id: 'test',
      name: 'Test slide'
    })

    this.state = {
      image: BlankImage
    }

    this.stateTypes = {
      image: 'image'
    }
  }

  onPreLoad() {
    this.engine.loader.add('artist', 'https://i.scdn.co/image/ab6761610000e5eb542bce36778c57b4abf80c88', {
      loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
      xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB
    })
  }

  onPostLoad() {
    const img = new PIXI.Sprite()
    img.position.set(280, 40)
    img.scale.set(0.8, 0.8)

    this.stage.addChild(img)

    this.items = {
      img
    }
    if (this.state.image.isBlank) {
      this.state.image = this.resources.artist.data
    }
  }


  createStartTimeline(tl) {
    tl.to(this.globalState, {
      backgroundColor: '#b851e3',
      duration: 1.3
    })
  }

  createEndTimeline (tl) {
    tl.to(this.globalState, {
      backgroundColor: '#26dce2',
      duration: 1.3,
    })
  }

  onStateUpdate() {
    this.items.img.texture = PIXI.Texture.from(this.state.image)
  }
}
