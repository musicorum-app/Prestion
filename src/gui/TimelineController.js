import * as PIXI from 'pixi.js'

export default class TimelineController {
  constructor() {
    this.app = new PIXI.Application({
      antialias: true,
      width: 504,
      height: 30,
      backgroundColor: 0xffffff
    })

  }
}
