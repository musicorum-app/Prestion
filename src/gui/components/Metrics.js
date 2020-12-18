import Box from "./Box";
import Section from "./Section";
import {useEffect, useRef} from "preact/hooks";

const MetricName = ({children}) => <span style={{
  fontWeight: 500,
  fontSize: 12
}}>{children}</span>

const Metrics = ({gui}) => {
  const fpsRef = useRef(null)

  useEffect(() => {
    fpsRef.current.appendChild(gui.fpsGraph.canvas)
  }, [])

  return <Box>
    <Section title="Metrics" ref={fpsRef}>
      <MetricName>FPS</MetricName>
    </Section>
  </Box>
}

export default Metrics