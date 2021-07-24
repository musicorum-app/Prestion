/**
 * @param {Slide} slide
 * @param {string} state
 * @param {string} type
 * @param defaultValue
 * @constructor
 */
export default function StateInput(slide, state, type, defaultValue) {


  return `
<label class="prestion_state_input_item" data-prestion-state="${state}" data-prestion-state-type="${type}">
  <span class="prestion_state_input_item_text">
      ${state}
  </span>
  ${inputTypes[type](state, defaultValue)}
</label>
  `
}


const TextInput = (state, defaultValue) => `
<input type="text" value="${defaultValue}" class="prestion_state_input_item_input" data-prestion-state-input="${state}" />
`


const ColorInput = (state, defaultValue) => `
<div class="prestion_state_input_item_input" style="padding-left: 0px">
<input type="color" value="${defaultValue}" style="visibility: hidden;" data-prestion-state-input="${state}">
<div class="prestion_state_input_item_color_box" style="background: ${defaultValue}"></div>
<p class="prestion_state_input_item_color_item">${defaultValue}</p>
</div>
`


const BooleanInput = (state, defaultValue) => `
   <input class="prestion_state_input_item_bool_input" type="checkbox" data-prestion-state-input="${state}" ${defaultValue ? 'checked' : ''}>
   <div class="prestion_state_input_item_input prestion_state_input_item_bool_wrapper" data-prestion-checked="${defaultValue}">
        <div class="prestion_state_input_item_bool_inside" />
    </div>
`

const ImageInput = (state, defaultValue) => `
<div class="prestion_state_input_item_image">
  <div class="prestion_state_input_image_preview">
  
  </div>
</div>
`

const inputTypes = {
  string: TextInput,
  color: ColorInput,
  boolean: BooleanInput,
  image: ImageInput
}
