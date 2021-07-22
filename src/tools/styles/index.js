export const GUI_BACKGROUND = '#131313'
export const GUI_BORDER = '#3c3c3c'
export const THEME_COLOR = '#225FFF'
export const INPUT_TEXT_WIDTH = 140

export default `
<style>

.prestion_tools {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
}

.prestion_info_panel {
    background: ${GUI_BACKGROUND};
    border: 1px solid ${GUI_BORDER};
    border-radius: 3px;
    margin: 14px;
    padding: 4px 14px 4px 20px;
}

.prestion_info_panel .section_title {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    position: relative;
    left: -6px;
    margin: 0;
    padding-bottom: 6px;
}

.prestion_info_panel p {
margin: 2px 0;
}

.prestion_info_panel hr {
    position: relative;
    border-color: rgba(255, 255, 255, 0.2);
    left: -6px;
    width: calc(100% + 6px);
}

.prestion_panel_controls {
display: flex;
width: 100%;
    justify-content: center;
}

.prestion_panel_controls button{
background: transparent;
border: none;
transition: opacity 200ms ease;
}

.prestion_panel_controls button svg {
    width: 32px;
    height: 32px;
}

.prestion_panel_controls button:hover {
    opacity: .7;
    cursor:pointer;
}

.prestion_panel_controls button:disabled {
    opacity: .3;
    cursor: no-drop;
}

.prestion_panel_controls button[data-prestion-replace="back"] svg {
transform: rotateZ(180deg);
}

.prestion_state_input_item {
display: flex;
margin: 4px 0;
}

.prestion_state_input_item_text {
    width: 70%;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.prestion_state_input_item_input {
    width: 100%;
    background: #2a2a2a;
    border: 2px solid #2a2a2a;
    border-radius: 3px;
    color: white;
    transition: all 200ms ease;
    padding: 4px;
    font-family: 'Poppins', sans-serif;
  outline: none;
  height: 32px;
  display: flex;
  align-items: center;
}

.prestion_state_input_item_input:hover {
    background: #363636;
    border-color: #363636;
}

.prestion_state_input_item_input:focus {
  background: rgba(255, 255, 255, 0.25);
  outline: none;
  border-color: ${THEME_COLOR};
}

.prestion_state_input_item_input input[type="color"] {
    visibility: hidden;
    width: 1px;
}

.prestion_state_input_item_color_box {
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 2px;
    margin-right: 4px;
}

</style>`
