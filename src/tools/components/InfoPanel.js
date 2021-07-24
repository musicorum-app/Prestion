/**
 *
 * @param {PrestionTools} plugin
 * @returns {string}
 */
export default function InfoPanel(plugin) {
  return `
<div class="prestion_info_panel">
  <p class="section_title">Slide</p>
  <p>
  <span data-prestion-replace="slide_number" style="color: rgba(255, 255, 255, 0.4); padding-right: 3px; font-weight: bold; font-family: monospace"></span>
  <span data-prestion-replace="current_slide"></span>
  <div class="prestion_panel_controls">
  <button data-prestion-replace="back">
  ${navIcon}
</button>
<button data-prestion-replace="next">
  ${navIcon}
</button>
    </div>
</p>
  <hr />
  <p class="section_title">Metrics</p>
  <div id="prestion_framerate_graph"></div>
  <div id="prestion_memory_graph"></div>
  <p class="section_title">Settings</p>
  
  <div class="prestion_states">
  <label class="prestion_state_input_item" data-prestion-config="keep-state">
  <span class="prestion_state_input_item_text" style="width: auto">
      Keep data
  </span>
  <input class="prestion_state_input_item_bool_input" type="checkbox" ${plugin.settings.keepData ? 'checked' : ''}>
   <div class="prestion_state_input_item_input prestion_state_input_item_bool_wrapper" data-prestion-checked="${plugin.settings.keepData}">
        <div class="prestion_state_input_item_bool_inside" />
    </div>
</label>
    </div>
    </div>
  
</div>
  `
}


const navIcon = `

<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
<path d="M0 0h24v24H0V0z" fill="none"/>
<path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/>
</svg>
`
