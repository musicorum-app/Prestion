export default class ValuesStore {
  constructor(engine, slide) {
    this.engine = engine
    this.slide = slide
    this.props = {}
  }

  defineProperty(name, type) {
    this.props[name] = type
  }
}