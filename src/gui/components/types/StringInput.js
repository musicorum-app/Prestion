import Input from "../Input";

export default function StringInput({name, value, onChange}) {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  }}>
    <span>{name}</span>
    <Input value={value} oninput={onChange} />
  </div>
}