import {Plugin, Slide, utils as PUtils} from "@musicorum/prestion";
import PrestionToolsComponent from "./components/PrestionTools";
import FrameRateGraph from "./graphs/FrameRateGraph";
import StateInput from "./components/StateInput";
import '@simonwep/pickr/dist/themes/nano.min.css';
import chroma from 'chroma-js'
import MemoryGraph from "./graphs/MemoryGraph";

export default class PrestionTools extends Plugin {
  constructor(props) {
    super(props, {
      name: 'Prestion Tools'
    })

    this.stateSaveInterval = 10E3 // 10 seconds
    this.settingsStorageKey = `__PRESTION_T_SETTINGS_${this.engine.constructor.name}`
    this.stateStorageKey = `__PRESTION_T_STATE_${this.engine.constructor.name}`
  }

  onStart() {
    this.element = document.createElement('div')
    this.element.className = 'prestion_tools'
    this.element.innerHTML = PrestionToolsComponent(this)
    this.engine.element.appendChild(this.element)


    this.createFPSGraph()
    this.createMemoryGraph()

    this.getReplaceableElement('back').onclick = () => this.engine.back()
    this.getReplaceableElement('next').onclick = () => this.engine.next()

    this.createSettingsComponent()
    this.updateSlideData()
    this.createStates(this.engine.currentSlide)
    this.createGlobalStates()
    this.handleSavedData()

    setInterval(() => this.saveStates(), this.stateSaveInterval)
  }

  onPostLoad() {
    this.createSettings()
    const val = localStorage.getItem(`${this.stateStorageKey}_SLIDE`)
    if (this.settings.keepData) {
      if (val) {
        const slide = this.engine.slides.find(s => s.id === val)
        if (slide) {
          this.engine._currentSlide = slide.index
        }
      }
    }
  }

  createSettings() {
    let settings = {
      keepData: false
    }
    if (window.localStorage.getItem(this.settingsStorageKey)) {
      settings = {
        ...settings,
        ...JSON.parse(window.localStorage.getItem(this.settingsStorageKey))
      }
    }


    this.settings = new Proxy(settings, {
      set: (target, p, value) => {
        target[p] = value
        localStorage.setItem(this.settingsStorageKey, JSON.stringify(settings))

        if (p === 'keepData') {
          if (value) {
            this.saveStates()
          } else {
            localStorage.removeItem(`${this.stateStorageKey}_SLIDE`)
          }
        }

        return true
      }
    })
  }

  createSettingsComponent() {
    const element = this.element.querySelector('.prestion_states')

    const keepState = element.querySelector('[data-prestion-config="keep-state"]')

    keepState.querySelector('input').oninput = () => {
      const value = keepState.querySelector('input').checked
      keepState.querySelector('.prestion_state_input_item_bool_wrapper').setAttribute('data-prestion-checked', value)

      this.settings.keepData = value
      if (!value) {
        this.removeSavedData()
      }
    }
  }

  createFPSGraph() {
    const graph = new FrameRateGraph()
    graph.load()
    document.getElementById('prestion_framerate_graph').appendChild(graph.canvas)

    this.engine.app.ticker.add(() => graph.update())
  }

  createMemoryGraph() {
    const graph = new MemoryGraph()
    graph.load()
    document.getElementById('prestion_memory_graph').appendChild(graph.canvas)

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

  /**
   * @param {Slide} slide
   */
  createStates(slide) {
    const statesElement = this.getReplaceableElement('slide_state')
    statesElement.innerHTML = ''

    this.buildStates(statesElement, slide, () => slide._onStateUpdate())

    this.statesSlide = slide._config.id
  }

  createGlobalStates() {
    const statesElement = this.getReplaceableElement('global_state')

    this.buildStates(statesElement, this.engine, () => this.engine.onGlobalStateUpdate())
  }

  /**
   * Build the HTMLElements' states
   * @param {HTMLElement} element
   * @param {Slide|PrestionProject} stateHolder
   * @param {Function} fn - The function to run after the state is changed
   */
  buildStates(element, stateHolder, fn) {
    for (let [k, v] of Object.entries(stateHolder.stateTypes)) {
      const defaultValue = stateHolder.state[k]
      element.insertAdjacentHTML('beforeend', StateInput(stateHolder, k, v, defaultValue))

      const input = element.querySelector(`[data-prestion-state-input="${k}"]`)

      if (v === 'image') {
        const wrapper = element.querySelector(`[data-prestion-state="${k}"]`)

        wrapper.querySelector('.prestion_state_input_image_preview').appendChild(defaultValue)

        wrapper.addEventListener('drop', async ev => {
          ev.preventDefault()
          try {
            const {dataTransfer} = ev
            const file = dataTransfer.files[0]
            let img
            if (file) {
              stateHolder.state[k] = await this.fileToImage(file)
            } else {
              stateHolder.state[k] = await PUtils.loadImage(dataTransfer.getData("url"))
            }
            fn()
          } catch (e) {
            console.error('Could not parse the dropped image', e)
          } finally {
            wrapper.classList.remove('dragging')
          }

        })

        wrapper.addEventListener('dragover', ev => {
          ev.preventDefault()
          wrapper.classList.add('dragging')
        })

        wrapper.addEventListener('dragleave', ev => {
          wrapper.classList.remove('dragging')
        })
      } else {
        input.oninput = () => {
          if (v === 'boolean') {
            stateHolder.state[k] = input.checked
          } else {
            stateHolder.state[k] = input.value
          }
          fn()
        }
      }

    }
  }

  onTransition() {
    this.updateSlideData()
    this.createStates(this.engine.currentSlide)

    if (this.settings.keepData) {
      this.saveStates()
    }
  }

  onCanMoveValueChange() {
    this.updateSlideData()
  }

  /**
   * Event triggered when the slide's state is changed by itself
   * @param {Slide} slide
   */
  onStateUpdate(slide) {
    if (this.statesSlide !== slide._config.id) return
    const statesElement = this.getReplaceableElement('slide_state')

    this.updateElementStates(statesElement, slide)
  }

  onGlobalStateUpdate() {
    const statesElement = this.getReplaceableElement('global_state')
    this.updateElementStates(statesElement, this.engine)
  }

  /**
   * Updates the HTMLElements' states
   * @param {HTMLElement} statesElement
   * @param {Slide|PrestionProject} stateHolder
   */
  updateElementStates(statesElement, stateHolder) {
    for (let [k, v] of Object.entries(stateHolder.stateTypes)) {
      const el = statesElement.querySelector(`[data-prestion-state="${k}"]`)
      const input = statesElement.querySelector(`[data-prestion-state-input="${k}"]`)
      const value = stateHolder.state[k]

      if (v === 'boolean') {
        input.checked = value
      } else if (v === 'image') {
        el.querySelector('.prestion_state_input_image_preview img').remove()
        const clone = new Image()
        clone.src = value.src
        clone.setAttribute('crossorigin', 'anonymous')
        clone.setAttribute('data-prestion-clone-from', k)
        el.querySelector('.prestion_state_input_image_preview').appendChild(clone)
      } else {
        input.value = value
      }

      if (v === 'color') {
        el.querySelector('.prestion_state_input_item_color_box').style.background = stateHolder.state[k]
        el.querySelector('.prestion_state_input_item_color_item').innerText = chroma(stateHolder.state[k]).hex()
      } else if (v === 'boolean') {
        el.querySelector('.prestion_state_input_item_bool_wrapper').setAttribute('data-prestion-checked', value)
      }
    }
  }

  /**
   * Returns a cleaned(only with defined parameters) clone of a state
   * @param {Slide|PrestionProject} stateHolder
   * @returns Object
   */
  getCleanedStateClone(stateHolder) {
    const clone = {}
    for (let [key, type] of Object.entries(stateHolder.stateTypes)) {
      const value = stateHolder.state[key]
      if (stateHolder._defaultState[key] === value) continue

      if (type === 'image' && value.src) {
        const isB64 = value.src.startsWith('data:image')
        clone[key] = [type, isB64 ? value.src : PUtils.imageToDataURI(value)]
      } else {
        clone[key] = [type, value]
      }
    }

    return clone
  }

  handleSavedData() {
    function setStates(stateHolder, states) {
      if (states) {
        const obj = JSON.parse(states)
        for (let [k, [type, value]] of Object.entries(obj)) {
          if (type !== stateHolder.stateTypes[k]) continue

          if (type === 'image') {
            PUtils.loadImage(value)
              .then(img => {
                stateHolder.state[k] = img
              })
          } else {
            stateHolder.state[k] = value
          }
        }
      }
    }

    const globalState = localStorage.getItem(`${this.stateStorageKey}_GLOBAL_STATE`)
    setStates(this.engine, globalState)

    for (let slide of this.engine.slides) {
      const state = localStorage.getItem(`${this.stateStorageKey}_SLIDE_${slide.id}`)
      setStates(slide, state)
    }
  }

  saveStates() {
    if (!this.settings.keepData) return

    localStorage.setItem(`${this.stateStorageKey}_SLIDE`, this.engine.currentSlide.id)

    const globalStateKey = `${this.stateStorageKey}_GLOBAL_STATE`
    const cleanClone = this.getCleanedStateClone(this.engine)
    localStorage.setItem(globalStateKey, JSON.stringify(cleanClone))

    const slideCleanClone = this.getCleanedStateClone(this.engine.currentSlide)

    const key = `${this.stateStorageKey}_SLIDE_${this.engine.currentSlide.id}`
    localStorage.setItem(key, JSON.stringify(slideCleanClone))

  }

  removeSavedData() {
    localStorage.removeItem(`${this.stateStorageKey}_GLOBAL_STATE`)
    localStorage.removeItem(`${this.stateStorageKey}_SLIDE`)

    for (let slide of this.engine.slides) {
      localStorage.removeItem(`${this.stateStorageKey}_SLIDE_${slide.id}`)
    }
  }

  fileToImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        PUtils.loadImage(reader.result.toString())
          .then(res => resolve(res))
      }
      reader.onerror = () => {
        reject()
      }

      reader.readAsDataURL(file)
    })
  }
}
