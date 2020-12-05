import {forwardRef} from "preact/compat";


const Section = forwardRef(({title, children}, ref) => {
  return (<div>
      <span style={{
        fontWeight: 600,
        fontSize: 14,
        color: 'rgba(255, 255, 255, .5)',
        textTransform: 'uppercase'
      }}>{title}</span>
      <div style={{
        marginLeft: 16,
        marginTop: 7,
        display: 'flex',
        flexDirection: 'column'
      }} ref={ref}>
        {children}
      </div>
    </div>)
})

export default Section