export default function InfoPanel() {
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
</div>
  `
}


const navIcon = `

<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
<path d="M0 0h24v24H0V0z" fill="none"/>
<path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/>
</svg>
`
