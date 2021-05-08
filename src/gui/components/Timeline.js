import Box from "./Box";
import Section from "./Section";
import {useEffect, useRef} from "preact/hooks";

const Timeline = ({gui}) => {
  const timelineRef = useRef(null)

  useEffect(() => {
    console.log(gui)
    timelineRef.current.appendChild(gui.timeline.app.view)
  }, [])

  return <Box minWidth={550}>
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        fontFamily: 'Consolas'
      }}>
        <span style={{
          color: 'transparent'
        }}>XXXXXXXXXXX</span>
        <button style={{
          background: 'none',
          border: 'none'
        }}>

          <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.43004V27.57C2.5 29.487 4.64391 30.6518 6.29497 29.6083L26.3541 17.0384C27.882 16.092 27.882 13.908 26.3541 12.9374L6.29497 0.391669C4.64391 -0.651783 2.5 0.513001 2.5 2.43004Z" fill="white"/></svg>
        </button>
        <span style={{
          color: 'rgba(255, 255, 255, 0.6)'
        }}>1.23 / 4.00</span>
      </div>
      <div ref={timelineRef} />
    </div>
  </Box>
}

export default Timeline
