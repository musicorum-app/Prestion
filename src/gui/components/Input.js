import {THEME_COLOR} from "../Styles";

export default function Input(props) {
  return <input style={{
    width: '100%',
    marginLeft: 18,
    background: 'rgba(0, 0, 0, .4)',
    color: 'white',
    borderRadius: 5,
    border: '2px solid rgba(255, 255, 255, .13)',
    transition: 'border .4s',
    padding: 10,
  }} className="prestion_input" {...props} />
}