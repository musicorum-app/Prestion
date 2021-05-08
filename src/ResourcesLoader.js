export default class ResourcesLoader {
  constructor(prestion) {
    this._prestion = prestion
    this._toLoad = []
  }

  addFont(font) {
    this._toLoad.push({
      type: 'font',
      ...font
    })

    return this
  }

  addCustom (fn) {
    this._toLoad.push({
      type: 'custom',
      fn
    })

    return this
  }

  async load() {
    return Promise.all(this._toLoad.map(tl => {
      if (tl.type === 'custom') return tl.fn
      else if (tl.type === 'font') return this.loadFont(tl.name, tl.url)
    }))
  }

  async loadFont(name, url) {
    const f = new FontFace(name, `url(${url})`)
    const font = await f.load()

    document.fonts.add(font)
    return font
  }
}
