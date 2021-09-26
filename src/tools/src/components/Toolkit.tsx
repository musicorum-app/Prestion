import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { PrestionToolkit } from '..'
import tweakpaneStyle from '../styles/tweakpaneStyle'

const ToolkitBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`

const Pane = styled.div`
  max-width: 370px;
  width: 100%;
`

const MainToolkitComponent: React.FC<{
  toolkit: PrestionToolkit
}> = ({ toolkit }) => {
  const mainPane = useRef<HTMLDivElement>(null)
  const statesPane = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mainPane.current && statesPane.current) {
      toolkit.createMainPane(mainPane.current)
      toolkit.createStatesPane(statesPane.current)
    }
  }, [mainPane, statesPane])

  return (
    <ToolkitBase>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <style>{tweakpaneStyle}</style>
      <Pane ref={mainPane}></Pane>
      <Pane ref={statesPane}></Pane>
    </ToolkitBase>
  )
}

export default MainToolkitComponent

export const renderToolkit = (element: Element, toolkit: PrestionToolkit) =>
  ReactDOM.render(<MainToolkitComponent toolkit={toolkit} />, element)
