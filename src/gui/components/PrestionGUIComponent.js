import {GUI_BACKGROUND, GUI_BORDER} from "../Styles";
import Box from "./Box";
import Metrics from "./Metrics";
import Slide from "./Slide";

const PrestionGUIComponent = ({gui}) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      color: 'white',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'start',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"/>

      <style>{`
      .prestion_input:hover {
          border: 2px solid rgba(255, 255, 255, .27) !important;
        }
        
        .prestion_input:focus {
        outline: none;
          border: 2px solid rgba(255, 255, 255, .53) !important;
        }
      `}</style>

      <Metrics gui={gui}/>

      <Slide gui={gui}/>

    </div>
  )
}

export default PrestionGUIComponent;
