import {THEME_COLOR} from "../Styles";

export default function Input(props) {
  return <input style={{
    width: '100%',
    background: 'rgba(255, 255, 255, .1)',
    color: 'white',
    borderRadius: 3,
    border: 'none',
    transition: 'background .4s',
    padding: '5px 13px',
    marginBottom: 4
  }} className="prestion_input" {...props} />
}
