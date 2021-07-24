import {useEffect} from "react";
import ExampleProject from "./ExampleProject";

function App() {

  useEffect(() => {
    const pr = document.getElementsByClassName('prestion')[0]

    for (let child of pr.children) {
      console.log(child)
      child.remove()
    }

    document.querySelectorAll('canvas, .prestion_tools').forEach(e => e.remove())

    const prestion = new ExampleProject()
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
