import { PrestionProject } from "@musicorum/prestion"
import { StateObject } from "@musicorum/prestion/dist/src/typings"
import {PrestionTools} from "@musicorum/prestion-tools"

interface ExampleProjectState extends StateObject {
  backgroundColor: string
}

export default class ExampleProject extends PrestionProject<ExampleProjectState> {
  constructor() {
    super({
      name: "ExampleProject",
    })

    this.state = {
      backgroundColor: '#26dce2'
    }

    this.stateTypes = {
      backgroundColor: 'string'
    }

    this.addPlugins(
      // @ts-ignore
      PrestionTools
    )

    this.addSlides(
      
    )
  }
}
