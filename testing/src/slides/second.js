import { Slide } from '../../../'
import {BlueColor, CrimsonColor, PurpleColor, SienaColor, SkyBlueColor, TangerineColor} from "../Constants";
import { gsap }  from 'gsap'
import Utils from "../../../src/Utils";

export default class SecondSlide extends Slide {
  constructor(...v) {
    super(...v);

    this.id = 'second'
    this.name = 'Second Slide'

    this.state = {
      transition: 0,
      bar0: 0,
      bar1: 0,
      bar2: 0,
      bar3: 0,
      bar4: 0,
      bar5: 0,
    }

    this.defineProperties({
    })

    this.timeline = this.createTimeline()
  }

  load() {
    this.createTitle()
  }

  in({ canvas }) {
    this.createCopy(canvas)
    this.timeline.resume()
  }

  onStateUpdate() {
    this.load()
  }

  createTimeline() {
    const tl = gsap.timeline()


    for (let i = 0; i < 6; i++) {
      tl.to(this.state, {
        [`bar${i}`]: 1,
        duration: 1.9,
        ease: 'expo.inOut'
      }, (i * .12))
    }


    tl.pause()
    return tl
  }

  createCopy(canvas) {
    const cc = document.createElement('canvas')
    cc.width = canvas.width
    cc.height = canvas.height

    const ctx = cc.getContext('2d')
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)
    this.copyCanvas = cc
  }

  createTitle() {

  }

  update({ canvas, windowSize }) {
    const ctx = canvas.getContext('2d')

    const boxWidth = (this.copyCanvas.width / 6)

    for (let i = 0; i < 6; i++) {
      const x = i * boxWidth
      const y = Utils.convertRange(this.state[`bar${i}`], [0, 1], [this.copyCanvas.height, 0])

      ctx.drawImage(this.copyCanvas, x, this.copyCanvas.height - y, boxWidth, windowSize[1], x, 0, boxWidth, this.copyCanvas.height)

      ctx.fillStyle = TangerineColor
      ctx.fillRect(x - 2, y, boxWidth + 4, windowSize[1])

    }

  }
}