export function getWindowSize() {
  return [window.innerWidth, window.innerHeight]
}

export function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
}

export function loadImage (src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.setAttribute('crossorigin', 'anonymous')
    img.src = src
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject()
    }
  })
}

/**
 * Converts a {HTMLImageElement} to a Base64 data URI string
 * @param {HTMLImageElement} image
 * @return string
 */
export function imageToDataURI (image) {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  canvas.getContext('2d').drawImage(image, 0, 0)

  return canvas.toDataURL('image/png')
}


const BlankImage = new Image(20, 20)
BlankImage.isBlank = true

export {BlankImage}
