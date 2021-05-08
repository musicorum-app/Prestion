import {BlueColor, CrimsonColor, PurpleColor, SkyBlueColor} from "../Constants";
import { gsap }  from 'gsap'
import {Slide} from "@musicorum/prestion";

export default class FirstSlide extends Slide {
  constructor(v) {
    super(v, {
      id: 'First',
      name: 'First Slide'
    });

    this.id = 'first'
    this.name = 'First Slide'

    this.state = {
      textX: 0.5,
      text: 'Teste 2'
    }

    this.defineProperties({
      textX: 'number',
      text: 'string'
    })

    this.timeline = this.createTimeline()
  }

  load() {
    this.createTitle()
  }

  onStateUpdate() {
    this.load()
  }

  createTimeline() {
    const tl = gsap.timeline()
      .to(this.state, {
        textX: 1.5,
        ease: 'power4.in',
        duration: 1.6
      })
      .to(this.state, {
        textX: -0.5,
        duration: 0
      })
      .to(this.state, {
        textX: 0.5,
        ease: 'power4.out',
        duration: 1.6
      })
      .to({}, {})

    tl.repeat(-1)
    tl.pause()
    return tl
  }

  createTitle() {
    this.state.text = this.state.text || '.'
    const c = document.createElement('canvas')
    const cx = c.getContext('2d')
    cx.font = '70px "Poppins SemiBold"'
    const { width, actualBoundingBoxAscent } = cx.measureText(this.state.text)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = 70

    const ctx = canvas.getContext('2d')
    ctx.font = '70px "Poppins SemiBold"'
    ctx.fillStyle = CrimsonColor
    ctx.fillText(this.state.text, 0,69)
    this.textCanvas = canvas
  }

  update({ canvas, windowSize }) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = PurpleColor
    ctx.fillRect(0, 0, windowSize[0], windowSize[1])

    const x = (this.state.textX * windowSize[0]) - (this.textCanvas.width / 2)

    ctx.drawImage(this.textCanvas, x, this.getCenter(windowSize, this.textCanvas)[1])

  }
}
