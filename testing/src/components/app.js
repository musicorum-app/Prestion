import {useEffect, useState} from "preact/hooks";

import FirstSlide from "../slides/first";
import SecondSlide from "../slides/second";
import PrestionExampleProject from "../PrestionExampleProject";

const App = () => {
  const [prestion, setPrestion] = useState(null)

  useEffect(() => {
    const prst = new PrestionExampleProject()

    prst.addSlide(new FirstSlide(prst))
    // prst.addSlide(new SecondSlide(prst))
    prst.load()
      .then(() => prst.start())


    window.Prestion = prst

    setPrestion(prst)
  }, [])

  return (
    <div id="prestion">

    </div>
  )
}

export default App;
