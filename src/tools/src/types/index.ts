import { BladeController, View } from '@tweakpane/core'
import { BladeApi } from 'tweakpane'

export interface TweakPaneFpsGraphController extends BladeApi<BladeController<View>> {
  begin: () => void
  end: () => void
}
