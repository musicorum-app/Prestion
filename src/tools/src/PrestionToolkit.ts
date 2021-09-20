import { Plugin, PrestionProject } from '@musicorum/prestion'
import { Pane } from 'tweakpane'

export default class PrestionToolkit extends Plugin<PrestionProject> {
  private stateSaveInterval = 10E3 // 10 seconds
  private settingsStorageKey: string
  private stateStorageKey: string
  private storageKeyPrefix = '__PRESTKIT_'

  public pane: Pane | null = null
  public element: HTMLDivElement

  constructor (props: PrestionProject) {
    super(props)

    this.settingsStorageKey = `${this.storageKeyPrefix}_SETTINGS_${this.engine.constructor.name}`
    this.stateStorageKey = `${this.storageKeyPrefix}_STATE_${this.engine.constructor.name}`
    this.element = document.createElement('div')
  }

  onStart () {
    console.log('Starting PrestionToolkit')
    this.createPane()
    this.engine.element.appendChild(this.element)
  }

  createPane () {
    this.pane = new Pane({
      container: this.element,
      title: 'Prestion Toolkit'
    })
  }
}
