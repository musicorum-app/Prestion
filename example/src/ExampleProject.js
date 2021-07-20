import {PrestionProject} from "@musicorum/prestion";
import IntroSlide from "./slides/intro";
import TestSlide from "./slides/test";

export default class ExampleProject extends PrestionProject {
  constructor() {
    super({
      name: 'Prestion Example',
      slides: [
        IntroSlide,
        TestSlide
      ],
      element: '#prestion'
    })
  }
}
