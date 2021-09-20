/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrestionProject, Slide } from '.'

export default class Plugin<P extends PrestionProject> {
  public engine: P

  constructor (
    prestion: P
  ) {
    this.engine = prestion
  }

  onPreLoad () {
    // Pre load event
  }

  async load () {
    // Load event
  }

  onPostLoad () {
    // Post load event
  }

  onStart () {
    // Start event
  }

  onPreNextSlide (target: Slide<P>) {
    // Pre next slide event
  }

  onNextSlide () {
    // Next slide event
  }

  onPreBackSlide (target: Slide<P>) {
    // Pre back slide event
  }

  onBackSlide () {
    // Back slide event
  }

  onTransition () {
    // Transition event
  }

  onStateUpdate (slide: Slide<P>) {
    // State update event
  }

  onGlobalStateUpdate () {
    /// Global state update event
  }

  onCanMoveValueChange () {
    // Can move value change event
  }
}
