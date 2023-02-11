import { useState } from 'react';
import axios from "axios";
import ReactJson from 'react-json-view'

function App() {
  const [file, setFile] = useState();
  const [jsonText, setJsonText] = useState();

  const parseCSV = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post("/parseCSV", formData).then(res => {
      console.log(res);
      setJsonText(res.data);
    })
  }

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      parseCSV();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Import csv file</h1>
        <form>
          <input type={"file"} accept={".csv"} onChange={handleOnChange} />
          <button onClick={handleOnSubmit}>IMPORT CSV</button>
          <ReactJson src={jsonText} />
        </form>
      </header>
    </div>
  );
}

export default App;
