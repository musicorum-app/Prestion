type DoubleNumberVector = [number, number]

export function getWindowSize (): DoubleNumberVector {
  return [window.innerWidth, window.innerHeight]
}

export function convertRange (value: number, r1: DoubleNumberVector, r2: DoubleNumberVector): number {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
}

export function loadImage (src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.setAttribute('crossorigin', 'anonymous')
    img.src = src
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (_, __, ___, ____, e) => {
      reject(e)
    }
  })
}

/**
 * Converts a {HTMLImageElement} to a Base64 data URI string
 * @param {HTMLImageElement} image
 * @return string
 */
export function imageToDataURI (image: HTMLImageElement): string {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  canvas.getContext('2d')?.drawImage(image, 0, 0)

  return canvas.toDataURL('image/png')
}

interface IBlankImage extends HTMLImageElement {
  isBlank: true
}

const BlankImage = new Image(2, 2) as IBlankImage
BlankImage.isBlank = true

export { BlankImage }
