type IPrestionProjectParameters = {
  element: HTMLElement | string,
}

type IFontResourceLoader = {
  name: string,
  url: string
}

type ICustomResourceLoader = () => Promise<void>

declare class ResourcesLoader {
  addFont(options: IFontResourceLoader): this

  addCustom(fn: ICustomResourceLoader): this

  load(): Promise<void>
}

export class PrestionProject {
  constructor(parameters: IPrestionProjectParameters)

  element: HTMLElement

  loader: ResourcesLoader

  /**
   * Initialization function triggered by the user
   */
  init()
}

type SlideParameters = {
  id: string,
  name: string
}

export class Slide {
  constructor(prestion: PrestionProject, parameters: SlideParameters)
}

export class Utils {

  /**
   * Returns the current window inner size, as [width, height]
   */
  static getWindowSize(): [number, number]
}
