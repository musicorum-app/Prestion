export default class Utils {

  /**
   * Retrieves the current window size
   * @returns {number[]} Window size as [x, y]
   */
  static getWindowSize() {
    return [window.innerWidth, window.innerHeight]
  }

  static convertRange(value, r1, r2) {
    return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
  }
}
