import {useEffect} from "react";
import ExampleProject from "./ExampleProject";

function App() {

  useEffect(() => {
    const pr = document.getElementById('prestion')

    if (pr.lastElementChild) pr.removeChild(pr.lastElementChild)

    const prestion = new ExampleProject()
    window.prestion = prestion

    prestion.load()
      .then(() => prestion.start())
  }, [])

  return (
    <div className="App">
      <div id="prestion" />
    </div>
  );
}

export default App;
