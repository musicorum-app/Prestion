import styles from '../styles'
import InfoPanel from "./InfoPanel";
import StatePanel from "./StatePanel";

export default (plugin) => `
${styles}
<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      
<div style="
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: start;
      ">
        ${InfoPanel(plugin)}
        ${StatePanel()}
      </div>
      
      TIMELINE
`
