import Input from "../Input";
import {INPUT_TEXT_WIDTH} from "../../Styles";

export default function ColorInput({name, value, onChange}) {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }}>
    <span style={{
      width: INPUT_TEXT_WIDTH,
      maxWidth: INPUT_TEXT_WIDTH,
      minWidth: INPUT_TEXT_WIDTH
    }}>{name} - {value}</span>
    <Input type="color" value={value} oninput={onChange} />
  </div>
}
