import Input from "../Input";
import {INPUT_TEXT_WIDTH} from "../../Styles";

export default function NumberInput({name, value, onChange}) {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }}>
    <span style={{
      width: INPUT_TEXT_WIDTH,
      maxWidth: INPUT_TEXT_WIDTH,
      minWidth: INPUT_TEXT_WIDTH
    }}>{name}</span>
    <Input type="number" value={value} oninput={onChange} />
  </div>
}
