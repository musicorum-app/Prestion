import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import { Prestion } from '../../../'

import FirstSlide from "../slides/first";

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

    prst.addSlide(new FirstSlide())
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
