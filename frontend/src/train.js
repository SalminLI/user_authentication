import React, {useState,useEffect} from "react";
import axios from 'axios';
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import "./styles.css";

function Training() {
  const [selectedOptions, setSelectedOptions] = useState();
  const [message,setMessage] = useState();

  const navigate = useNavigate();

  var groups = [];
  function getGroupList(data) {
    const BASE_URL = 'http://localhost:3500/';
    axios.get(`${BASE_URL}groups`)
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
        tmp[headers[1]] = row[0];;
        groups.push(tmp);
      };
    })
    .catch((error) => {
      setMessage(error);
    });
  }

  useEffect(()=>{
    getGroupList();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelect(data) {
    setSelectedOptions(data);
    let group = data['label'];
    if (group !== '<Return>') {
      navigate({
        pathname: '/test/' + group,
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
        <h4>Select group</h4>
        <div className="dropdown-container">
          <br/><br/><br/><br/><br/><br/>
          <Select
            options = {groups}
            placeholder = "Select group"
            value={selectedOptions}
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

export default Training
