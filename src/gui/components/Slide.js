import Box from "./Box";
import Section from "./Section";
import {useEffect, useRef, useState} from "preact/hooks";
import StringInput from "./types/StringInput";
import NumberInput from "./types/NumberInput";

const Text = ({children}) => <span>{children}</span>

const Slide = ({gui}) => {
  const [store, setStore] = useState(null)
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setUpdate(performance.now())
      setStore(gui.prestion.valueStores[gui.prestion.currentSlide.id])
    }, 100)
  }, [])

  const changeValue = (name) => (event) => {
    store.slide.state[name] = event.target.value
    store.slide.onStateUpdate()
  }

  return <Box minWidth={400}>
    <Section
      title="Slide"
    >
      <Text>{gui.prestion.currentSlide.name}</Text>
    </Section>
    <Section
      title="Values"
    >
      {
        store ? Object.entries(store.props).map(([name, type]) => {
          if (type === 'string') {
            return <StringInput
              name={name}
              value={store.slide.state[name]}
              onChange={changeValue(name)}
            />
          }
          if (type === 'number') {
            return <NumberInput
              name={name}
              value={store.slide.state[name]}
              onChange={changeValue(name)}
            />
          }
        }) : null
      }
    </Section>
  </Box>
}

export default Slide