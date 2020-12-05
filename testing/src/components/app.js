import {useEffect, useState} from "preact/hooks";
import { Prestion } from '../../../'

import FirstSlide from "../slides/first";
import SecondSlide from "../slides/second";

const App = () => {
  const [prestion, setPrestion] = useState(null)

  useEffect(() => {
    const prst = new Prestion('#prestion', {
      fonts: [
        {
          name: 'Poppins SemiBold',
          url: '/assets/fonts/Poppins-SemiBold.ttf'
        }
      ]
    })

    prst.addSlide(new FirstSlide(prst))
    prst.addSlide(new SecondSlide(prst))
    prst.preLoad()
      .then(() => prst.start())

    setPrestion(prst)
  }, [])

  return (
    <div id="prestion">

    </div>
  )
}

export default App;
