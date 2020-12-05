import {render} from "preact";
import PrestionGUIComponent from "./components/PrestionGUIComponent";
import Graph from "./Graph";
import FPSGraph from "./graphs/FPSGraph";

export default class PrestionGUI {
  constructor(element, prestion) {
    this.prestion = prestion
    this.rootElement = element
    this.createFPSCanvas()

    this.renderGUI()
  }

  renderGUI() {
    render(<PrestionGUIComponent gui={this} />, this.rootElement)
  }

  createFPSCanvas() {
    const graph = new FPSGraph('fps', {
      primary: '#d73cea',
      secondary: '#fcf84a',
      third: '#05c1fd'
    })
    graph.load()
    this.fpsGraph = graph
  }

}