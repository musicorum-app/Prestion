export function getWindowSize() {
  return [window.innerWidth, window.innerHeight]
}

export function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
}
