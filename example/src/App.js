import {useEffect} from "react";
import ExampleProject from "./ExampleProject";

function App() {

  useEffect(() => {
    const pr = document.getElementsByClassName('prestion')[0]

    if (pr.children.length !== 0) {
      for (let child of pr.children) {
        child.remove()
      }
    }

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
