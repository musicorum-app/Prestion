import { Plugin, PrestionProject, Slide } from '.'

export type StateResolvable = string | number | boolean | HTMLImageElement

export type StateTypeAsString = 'string' | 'number' | 'boolean' | 'image' | 'color'

export type StateObject = Record<string, StateResolvable | undefined>

// Slides

export interface SlideInsideOptions<P extends PrestionProject> {
  prestion: P,
  index: number
}

export interface SlideOptions {
  id: string,
  name: string
}

export interface SlideConstructor<P extends PrestionProject> {
  new (options: SlideInsideOptions<P>): Slide<P>
}

// Plugins

export interface PluginConstructor<P extends PrestionProject> {
  new (prestion: P): Plugin<P>
}

// Other

export interface PrestionProjectConfig {
  name: string,
  element: string | HTMLElement,
}

export interface PrestionProjectConfigOptionals {
  name?: string,
  element?: string | HTMLElement,
}
