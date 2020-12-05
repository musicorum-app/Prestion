export default class Utils {

  /**
   * Retrieves the current window size
   * @returns {number[0]} Window width
   * @returns {number[1]} Window height
   */
  static getWindowSize() {
    return [window.innerWidth, window.innerHeight]
  }

  static async loadFont(name, url) {
    const f = new FontFace(name, `url(${url})`)
    const font = await f.load()

    document.fonts.add(font)
    return font
  }

  static convertRange(value, r1, r2) {
    return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
  }
}