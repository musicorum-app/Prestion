import {PrestionProject} from "@musicorum/prestion";
import IntroSlide from "./slides/intro";
import TestSlide from "./slides/test";
import {PrestionTools} from "@musicorum/prestion-tools";

export default class ExampleProject extends PrestionProject {
  constructor() {
    super({
      name: 'Prestion Example',
      slides: [
        IntroSlide,
        TestSlide
      ],
      plugins: [
        PrestionTools
      ],
      element: '.prestion'
    })
  }
}
