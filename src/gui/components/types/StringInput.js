import Input from "../Input";
import {INPUT_TEXT_WIDTH} from "../../Styles";

export default function StringInput({name, value, onChange}) {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }}>
    <span style={{
      width: INPUT_TEXT_WIDTH,
      maxWidth: INPUT_TEXT_WIDTH,
      minWidth: INPUT_TEXT_WIDTH
    }}>{name}</span>
    <Input value={value} oninput={onChange} />
  </div>
}
