import { useState } from 'react';
import { JsonToTable } from "react-json-to-table";
import axios from "axios";
import './App.css';

function App() {
  const [file, setFile] = useState();
  const [jsonText, setJsonText] = useState();

  const parseCSV = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post("/parseCSV", formData).then(res => {
      console.log(res.data);
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
        <h1 className='display-6'>Import csv file</h1>
        <form>
          <input className="form-control" type="file" accept=".csv" id="formFile" onChange={handleOnChange} />
          <button type="button" className="btn btn-primary btn-sm" onClick={handleOnSubmit}>IMPORT CSV</button>
        </form>
        <div id='previewTable'>
          <JsonToTable json={jsonText} />
        </div >
      </header>
    </div>
  );
}

export default App;
