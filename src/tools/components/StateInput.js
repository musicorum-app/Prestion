/**
 * @param {Slide} slide
 * @param {string} state
 * @param {string} type
 * @param defaultValue
 * @constructor
 */
export default function StateInput(slide, state, type, defaultValue) {
  return `
<div class="prestion_state_input_item" data-prestion-state="${state}">
  <span class="prestion_state_input_item_text">
      ${state}
  </span>
  ${inputTypes[type](state, defaultValue)}
</div>
  `
}


const TextInput = (state, defaultValue) => `
<input type="text" value="${defaultValue}" class="prestion_state_input_item_input" data-prestion-state-input="${state}" />
`


const ColorInput = (state, defaultValue) => `
<label class="prestion_state_input_item_input"">
<input type="color" value="${defaultValue}" style="visibility: hidden;" data-prestion-state-input="${state}">
<div class="prestion_state_input_item_color_box" style="background: ${defaultValue}"></div>
<p class="prestion_state_input_item_color_item">${defaultValue}</p>
</label>
`

const inputTypes = {
  string: TextInput,
  color: ColorInput
}
