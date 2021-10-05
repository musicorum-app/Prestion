import { Plugin, PrestionProject } from '@musicorum/prestion'
import { BladeApi, FolderApi, FolderParams, InputBindingApi, Pane } from 'tweakpane'
import { renderToolkit } from './components/Toolkit'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { TweakPaneFpsGraphController } from './types'
import { StateScope } from './StateScope'
import { InputBinding } from '@tweakpane/core/dist/cjs/common/binding/input'

export default class PrestionToolkit extends Plugin<PrestionProject> {
  private stateSaveInterval = 10E3 // 10 seconds
  private settingsStorageKey: string
  private stateStorageKey: string
  private storageKeyPrefix = '__PRESTKIT_'

  public element: HTMLDivElement
  private mainPane: Pane | null = null
  private statesPane: Pane | null = null
  public globalStatesFolder: FolderApi | null = null

  private slideStatesFolders: Map<string, FolderApi> = new Map()

  public keepState = false

  constructor (props: PrestionProject) {
    super(props)

    this.settingsStorageKey = `${this.storageKeyPrefix}_SETTINGS_${this.engine.constructor.name}`
    this.stateStorageKey = `${this.storageKeyPrefix}_STATE_${this.engine.constructor.name}`
    this.element = document.createElement('div')
  }

  onPreLoad () {
    console.log('Starting PrestionToolkit')
    this.createStatesPane(this.element)
    // this.createPane()

    this.element.style.position = 'fixed'
    this.element.style.top = '0'
    this.element.style.left = '0'
    renderToolkit(this.element, this)
    this.engine.element.appendChild(this.element)
  }

  async createMainPane (element: HTMLElement) {
    this.mainPane = new Pane({
      container: element,
      title: this.engine.name
    })
    this.registerPanePlugins(this.mainPane)

    this.mainPane.addBlade({
      view: 'text',
      label: 'Current slide',
      value: this.engine.currentSlide.name,
      parse: (v: string) => v,
      disabled: true
    })

    this.mainPane.addBlade({
      label: 'Control',
      view: 'buttongrid',
      size: [2, 1],
      cells: (x: number) => ({
        title: ['<', '>'][x]
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).on('click', (ev) => {
      if (ev.index[0] === 0) {
        this.engine.back()
      } else {
        this.engine.next()
      }
    })

    const metricsFolder = this.mainPane.addFolder({
      title: 'Metrics'
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fpsGraph: TweakPaneFpsGraphController = metricsFolder.addBlade({
      view: 'fpsgraph',
      label: 'FPS',
      lineCount: 4,
      max: 150,
      interval: 20
    })

    fpsGraph.begin()
    this.engine.app.ticker.add(() => {
      fpsGraph.end()
      fpsGraph.begin()
    })
  }

  createStatesPane (element: HTMLElement) {
    this.statesPane = new Pane({
      container: element,
      title: 'States'
    })

    this.globalStatesFolder = this.statesPane.addFolder({
      title: 'Global states'
    })

    for (const slide of this.engine.slides) {
      this.slideStatesFolders.set(slide.id, this.createLevitatingFolder({
        title: slide.name
      }))
    }
  }

  createLevitatingFolder (params: FolderParams): FolderApi {
    const el = document.createElement('div')
    const pane = new Pane({
      container: el
    })

    const folder = pane.addFolder(params)
    pane.remove(folder)
    pane.dispose()
    el.remove()
    return folder
  }

  bindGlobalStateValue (holder: Record<string, unknown>, key: string, options: Record<string, unknown>) {
    this.globalStatesFolder?.addInput(holder, key, options)
      .on('change', (value) => {
        console.log(value)
      })
  }

  private registerPanePlugins (pane: Pane) {
    pane.registerPlugin(EssentialsPlugin)
  }

  onDispose () {
    this.mainPane?.dispose()
    this.statesPane?.dispose()
  }
}
