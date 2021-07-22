import {Plugin} from "@musicorum/prestion";
import PrestionToolsComponent from "./components/PrestionTools";
import FrameRateGraph from "./graphs/FrameRateGraph";
import StateInput from "./components/StateInput";
import '@simonwep/pickr/dist/themes/nano.min.css';
import Pickr from '@simonwep/pickr';

export default class PrestionTools extends Plugin {
  constructor(props) {
    super(props, {
      name: 'Prestion Tools'
    })
  }

  onStart() {
    this.element = document.createElement('div')
    this.element.className = 'prestion_tools'
    this.element.innerHTML = PrestionToolsComponent(this)
    this.engine.element.appendChild(this.element)

    this.createFPSGraph()

    this.getReplaceableElement('back').onclick = () => this.engine.back()
    this.getReplaceableElement('next').onclick = () => this.engine.next()

    this.updateSlideData()
    this.createStates(this.engine.currentSlide)

    this.statesSlide = null
  }

  createFPSGraph() {
    const graph = new FrameRateGraph()
    graph.load()
    document.getElementById('prestion_framerate_graph').appendChild(graph.canvas)

    this.engine.app.ticker.add(() => graph.update())
  }

  getReplaceableElement(data) {
    return this.element.querySelector(`[data-prestion-replace="${data}"]`)
  }

  updateSlideData() {
    const currentSlide = this.getReplaceableElement('current_slide')
    const slideNumber = this.getReplaceableElement('slide_number')

    const backBtn = this.getReplaceableElement('back')
    const nextBtn = this.getReplaceableElement('next')

    if (this.engine.canMove) {
      backBtn.disabled = this.engine._currentSlide === 0
      nextBtn.disabled = this.engine._currentSlide === this.engine.slides.length - 1
    } else {
      backBtn.disabled = true
      nextBtn.disabled = true
    }


    slideNumber.innerHTML = `${this.engine._currentSlide}/${this.engine.slides.length - 1}`
    currentSlide.innerHTML = this.engine.currentSlide._config.name
  }

  createStates(slide) {
    const statesElement = this.getReplaceableElement('slide_state')
    statesElement.innerHTML = ''

    for (let [k, v] of Object.entries(slide._stateTypes)) {
      const defaultValue = this.engine.currentSlide.state[k]
      statesElement.insertAdjacentHTML('beforeend', StateInput(slide, k, v, defaultValue))

      const input = statesElement.querySelector(`[data-prestion-state-input="${k}"]`)

      console.log(input)

      input.oninput = () => {
        slide.state[k] = input.value
        slide._onStateUpdate()
      }

    }

    this.statesSlide = slide._config.id
  }


  onTransition() {
    this.updateSlideData()
    this.createStates(this.engine.currentSlide)
  }

  onCanMoveValueChange() {
    this.updateSlideData()
  }

  onStateUpdate (slide) {
    if (this.statesSlide !== slide._config.id) return
    const statesElement = this.getReplaceableElement('slide_state')

    for (let [k, v] of Object.entries(slide._stateTypes)) {
      console.log(k)
      const el = statesElement.querySelector(`[data-prestion-state="${k}"]`)
      const input = statesElement.querySelector(`[data-prestion-state-input="${k}"]`)
      input.value = slide.state[k]

      if (v === 'color') {
        el.querySelector('.prestion_state_input_item_color_box').style.background = slide.state[k]
        el.querySelector('.prestion_state_input_item_color_item').innerText = slide.state[k]
      }
    }
  }
}
