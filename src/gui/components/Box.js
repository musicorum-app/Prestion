import {GUI_BACKGROUND, GUI_BORDER} from "../Styles";
import {forwardRef} from "preact/compat";

export default forwardRef(({children, minWidth}, ref) => {
  return <div ref={ref} style={{
    background: GUI_BACKGROUND,
    border: `6px solid ${GUI_BORDER}`,
    borderRadius: '12px',
    margin: 10,
    padding: 10,
    minWidth: minWidth || 0
  }}>
    {children}
  </div>
})