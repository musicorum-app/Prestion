import {Slide} from "@musicorum/prestion";
import * as PIXI from "pixi.js";
import {getWindowSize} from "@musicorum/prestion/utils";
import gsap from "gsap";

export default class TestSlide extends Slide {
  constructor(p) {
    super(p, {
      id: 'test',
      name: 'Test slide'
    })

    this.state = {
      bgColor: '#26dce2'
    }
  }

  onPostLoad() {
    const bg = new PIXI.Graphics()
      .beginFill(this.state.bgColor)
      .drawRect(0, 0, ...getWindowSize())
      .endFill()

    this.stage.addChild(bg)

    this.items = {
      bg
    }
  }

  onWindowResize(width, height) {
    this.updateBgColor()
  }

  createStartTimeline(tl, finish) {
    console.log('start')
    tl.to(this.state, {
      bgColor: '#b851e3',
      duration: 1.3,
      onUpdate: () => this.updateBgColor(),
      onComplete: () => finish()
    })

    return tl
  }

  rgbaToHex (rgba) {
    function trim (str) {
      return str.replace(/^\s+|\s+$/gm,'');
    }
    var inParts = rgba.substring(rgba.indexOf("(")).split(","),
      r = parseInt(trim(inParts[0].substring(1)), 10),
      g = parseInt(trim(inParts[1]), 10),
      b = parseInt(trim(inParts[2]), 10),
      a = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2);
    var outParts = [
      r.toString(16),
      g.toString(16),
      b.toString(16),
      Math.round(a * 255).toString(16).substring(0, 2)
    ];

    // Pad single-digit output values
    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = '0' + part;
      }
    })

    return ('#' + outParts.join(''));
  }

  updateBgColor() {
    const [width, height] = getWindowSize()
    this.items.bg.beginFill(parseInt(this.rgbaToHex(this.state.bgColor).slice(1), 16))
      .drawRect(0, 0, width, height)
      .endFill()
  }
}
