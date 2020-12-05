import Input from "../Input";

export default function NumberInput({name, value, onChange}) {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  }}>
    <span>{name}</span>
    <Input type="number" value={value} oninput={onChange} />
  </div>
}