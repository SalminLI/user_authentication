import React, {useState,useEffect} from "react";
import axios from 'axios';
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import "./styles.css";

function Load() {
  const [selectedOption, setSelectedOption] = useState();
  const [message,setMessage] = useState();
  const [csvFiles,setCsvFiles] = useState([]);

  const navigate = useNavigate();
  const BASE_URL = 'http://localhost:3500/';

  function getFiles() {
    let files = [];
    axios.get(`${BASE_URL}files`)
    .then((response) => {
      let result = response.data;
      let tmp = {};
      let row = [];
      let n = result.length;
      const headers = ['label','value'];
      for(var i=0; i<=n; i++) {
        tmp = {};
        if (i<n) {
          row[0] = result[i];
        } else {
          row[0] = '<Return>';
        }
        tmp[headers[0]] = row[0];
        tmp[headers[1]] = row[0];
        files.push(tmp);
      };
      setCsvFiles(files);
    })
    .catch((error) => {
      setMessage(error);
    });
  }

  useEffect(()=>{
    getFiles();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelect(data) {
    setSelectedOption(data);
    let group = data['value'];
    if (group !== '<Return>') {
      axios.get(`${BASE_URL}load`, {params: {group: group}})
      .then(res => {
        let answer = res.data;
        setMessage(answer);
      })
      .catch(error => {
        setMessage(error);
      });
    } else {
      navigate({
        pathname: '/',
      });
    }
  }

  return (
    <>
      <div className="app">
        <div className="dropdown-container">
          <br/><br/><br/><br/><br/><br/>
          <h4>Load file</h4>
          <Select
            options = {csvFiles}
            placeholder = "Select file"
            value={selectedOption}
            onChange = {handleSelect}
            isSearchable = {true}
            maxMenuHeight={500}
          />
        </div>
        <h4> {message} </h4>
      </div>
    </>
  );
}

export default Load
