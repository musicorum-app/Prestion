import React, { useEffect } from 'react';
import ExampleProject from './prestion/project';

function App() {

  useEffect(() => {
    const pr = document.getElementsByClassName('prestion')[0]


    // @ts-ignore
    for (let child of pr.children) {
      child.remove()
    }
    
    document.querySelectorAll('canvas, .prestion_tools').forEach(e => e.remove())
    
    const prestion = new ExampleProject()
    
    // @ts-ignore
    window.prestion = prestion
    
    prestion.load()
      .then(() => prestion.start())

  }, [])

  return (
    <div className="App">
      <div className="prestion" />
    </div>
  );
}

export default App;
