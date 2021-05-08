import {GUI_BACKGROUND, GUI_BORDER} from "../Styles";
import {forwardRef} from "preact/compat";

export default forwardRef(({children, minWidth}, ref) => {
  return <div ref={ref} style={{
    background: GUI_BACKGROUND,
    border: `1px solid ${GUI_BORDER}`,
    borderRadius: '3px',
    margin: 22,
    padding: '6px 18px',
    minWidth: minWidth || 0
  }}>
    {children}
  </div>
})
