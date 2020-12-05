import ValuesStore from "./ValuesStore";

export default class Slide {
  constructor(prestion) {
    this.id = null
    this.engine = prestion.engine
  }

  load() {

  }

  start() {

  }

  update() {

  }

  getCenter([w, h], {width, height}) {
    return [(w / 2) - (width / 2), (h / 2) - (height / 2)]
  }

  defineProperties(values) {
    const store = new ValuesStore(this.engine, this)
    for (const [name, type] of Object.entries(values)) {
      store.defineProperty(name, type)
    }

    this.engine.defineStore(this.id, store)
  }

  in() {}

  out() {}
}