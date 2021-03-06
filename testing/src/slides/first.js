import {BlueColor, CrimsonColor, PurpleColor, SkyBlueColor} from "../Constants";
import {gsap} from 'gsap'
import {Slide, Utils} from "@musicorum/prestion";
import {PixiSlide} from "@musicorum/prestion-pixi";
import * as PIXI from 'pixi.js'

export default class FirstSlide extends PixiSlide {
  constructor(v) {
    super(v, {
      id: 'First',
      name: 'First Slide'
    })

    this.state = {
      text: 'Example text',
      grad1: '#F37724',
      grad2: '#AD0A0A'
    }

    this.defineProperties({
      text: 'string',
      grad1: 'color',
      grad2: 'color'
    })

    this.timeline = this.createTimeline()

    this.items = {}

    this.gradientCanvas = document.createElement('canvas')
  }

  postLoad() {
    const bg = new PIXI.Sprite(PIXI.Texture.from(this.createGradient()))
    this.stage.addChild(bg)

    const textContainer = new PIXI.Container()

    const text = new PIXI.Text(this.state.text, new PIXI.TextStyle({
      fill: 0xffffff,
      fontFamily: 'Poppins'
    }))
    text.anchor.set(0.5, 0.5)
    textContainer.x = Utils.getWindowSize()[0] / 2
    textContainer.y = Utils.getWindowSize()[1] / 2
    textContainer.addChild(text)
    this.stage.addChild(textContainer)

    this.items.bg = bg
    this.items.text = textContainer
    this.items.textItem = text


    gsap.from(text, {
      y: '+=30',
      alpha: 0,
      duration: .7,
      delay: .7,
      // tint: 0x0000ff,
      ease: 'expo.out'
    })

    gsap.to(this.state, {
      grad1: '#16996A',
      grad2: '#29508B',
      delay: 2,
      duration: .4,
      // repeat: -1,
      repeatDelay: 2,
      yoyo: true,
      ease: 'linear',
      onUpdate: () => {
        this.items.textItem.text = this.state.text
        this.items.bg.texture.destroy(true)
        PIXI.Texture.removeFromCache(this.items.bg.texture)

        this.items.bg.texture = PIXI.Texture.from(this.createGradient())
      }
    })

  }

  onStateUpdate() {
    this.items.textItem.text = this.state.text
    this.items.bg.texture.destroy(true)
    PIXI.Texture.removeFromCache(this.items.bg.texture)

    this.items.bg.texture = PIXI.Texture.from(this.createGradient())
  }

  createTimeline() {
    const tl = gsap.timeline()
    //   .to(this.state, {
    //     textX: 1.5,
    //     ease: 'power4.in',
    //     duration: 1.6
    //   })
    //   .to(this.state, {
    //     textX: -0.5,
    //     duration: 0
    //   })
    //   .to(this.state, {
    //     textX: 0.5,
    //     ease: 'power4.out',
    //     duration: 1.6
    //   })
    //   .to({}, {})
    //
    // tl.repeat(-1)
    // tl.pause()
    return tl
  }

  createGradient() {
    const c = this.gradientCanvas
    const [w, h] = Utils.getWindowSize()
    c.width = w
    c.height = h

    const ctx = c.getContext('2d')

    const grd = ctx.createLinearGradient(0, 0, w, h)
    grd.addColorStop(0, this.state.grad1)
    grd.addColorStop(1, this.state.grad2)

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, w, h)

    return c
  }

  onWindowResize() {
    this.items.textItem.text = this.state.text
    this.items.bg.texture.destroy(true)
    PIXI.Texture.removeFromCache(this.items.bg.texture)

    this.items.bg.texture = PIXI.Texture.from(this.createGradient())

    const [w, h] = Utils.getWindowSize()
    const textContainer = this.items.text

    textContainer.x = w / 2
    textContainer.y = h / 2
  }

  createTitle() {
    this.state.text = this.state.text || '.'
    const c = document.createElement('canvas')
    const cx = c.getContext('2d')
    cx.font = '70px "Poppins SemiBold"'
    const {width, actualBoundingBoxAscent} = cx.measureText(this.state.text)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = 70

    const ctx = canvas.getContext('2d')
    ctx.font = '70px "Poppins SemiBold"'
    ctx.fillStyle = CrimsonColor
    ctx.fillText(this.state.text, 0, 69)
    this.textCanvas = canvas
  }

  update({canvas, windowSize}) {
    // const ctx = canvas.getContext('2d')
    // ctx.fillStyle = PurpleColor
    // ctx.fillRect(0, 0, windowSize[0], windowSize[1])
    //
    // const x = (this.state.textX * windowSize[0]) - (this.textCanvas.width / 2)
    //
    // ctx.drawImage(this.textCanvas, x, this.getCenter(windowSize, this.textCanvas)[1])

  }
}
