import React, {useState,useEffect} from "react";
import axios from 'axios';
import Select from "react-select";
import {useParams,useNavigate} from "react-router-dom";
import {Form,Input,Button} from './AuthForms';
import "./styles.css";

function Test() {
  const [max_page, setMaxPage] = useState(1);
  const [data, setData] = useState({});
  const [step, setStep] = useState(1);
  const [words, setWords] = useState([]);
  const [trans, setTrans] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const [selectedTrans, setSelectedTrans] = useState({});
  const [selectedNum, setSelectedNum] = useState(0);
  const [message,setMessage] = useState();

  const navigate = useNavigate();
  const params = useParams();

  function getGroupWords(data) {
    const BASE_URL = 'http://localhost:3500/';
    let group = params['group'];
    axios.get(`${BASE_URL}`, {params: {group: group}})
    .then((response) => {
      let result = response.data;
      let len = result.length;
      let d = (len-len%10);
      let ten = d/10;
      if (len>d) ten++;
      setMaxPage(ten);
      setData(result);
    })
    .catch((error) => {
      setMessage(error);
    });
  }

  useEffect(()=>{
    getGroupWords();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  function TestClick(e: React.ChangeEvent<HTMLInputElement>) {
    data.sort(function(a, b) {
      return a[Number'w_id'] - b[Number'w_id'];
    })
    let l = data.length;
    let n = (Number(step)-1)*10;
    let n2 = n + 10;
    if (n2>l) n2=l;
    l = 1;
    let row = [];
    let tmp = {};
    let array1 = [];
    let array2 = [];
    const headers = ['label','value'];

    for(let i=n; i<n2; i++) {
      tmp = {};
      row[0] = data[i];
      tmp[headers[0]] = row[0]['word'];
      tmp[headers[1]] = l.toString();
      array1.push(tmp);
      tmp = {};
      tmp[headers[0]] = row[0]['trans'];
      tmp[headers[1]] = l.toString();
      array2.push(tmp);
      l++;
    }
    tmp = {};
    row[0] = '<Return>';
    tmp[headers[0]] = row[0];
    tmp[headers[1]] = row[0];;
    array1.push(tmp);

    for (let j=array2.length-1; j>0; j--) { 
      let k = Math.floor(Math.random() * (j+1));
      row = array2[j];
      array2[j] = array2[k];
      array2[k] = row;
    }

    setWords(array1);
    setTrans(array2);
    setSelected(true);
  }

  function handleSelectWord(data) {
    setSelectedWord(data);
    setSelectedTrans({});
    let word = data['label'];
    if (word!=='<Return>') {
      let s = word.indexOf('<<');
      if (s<0) {
        let num = Number(data['value']);
        setSelectedNum(num);
        setMessage('Select translation');
      } else {
        setMessage('The word has already been translated');
        setTimeout( () => {
          if (word>'') {
            setSelectedWord({});
          }
        },1000);
      }
    } else {
      if (step<max_page) {
        let next_page = Number(step) + 1;     
        setStep(next_page);
      }
      setSelectedWord({});
      setSelected(false);
    }
  }

  function handleSelectTrans(data) {
    setSelectedTrans(data);
    if (selectedNum>0) {
      let num = Number(data['value']);
      if (num===selectedNum) {
        let array = words;
        let row =array[num-1];
        let word = '<<'+row['label']+'>>';
        let tmp = {};
        tmp['label'] = word;
        tmp['value'] = (num).toString();
        array[num-1] = tmp;
        setWords(array);
        setSelectedNum(0);
        setMessage('Correct translation');
        setTimeout( () => {
          if (trans>'') {
            setSelectedWord({});
            setSelectedTrans({});
          }
        },1000);
      } else {
        setMessage('Error');
        setTimeout( () => {
          setSelectedTrans({});
        },1000);
      }
    } else {
      setMessage('Word is not selected');
        setTimeout( () => {
          setSelectedTrans({});
        },1000);
    }
  }

  function ReturnClick() {
    navigate({
      pathname: '/train',
    });
  }

  return (
    <>
      <div className="app">
        <div>
          { 
            (() => {
              if(isSelected) {
                return (
                  <div className="dropdown-container">
                    <br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/>
                    <h4>Select word</h4>
                    <Select
                      options = {words}
                      placeholder = "Select word"
                      value={selectedWord}
                      onChange = {handleSelectWord}
                      maxMenuHeight={400}
                    />
                  <div className="dropdown-container2">
                    <h4> {message} </h4>
                    <Select
                      options = {trans}
                      placeholder = "Select translation"
                      value={selectedTrans}
                      onChange = {handleSelectTrans}
                      maxMenuHeight={400}
                    />
                  </div>
                  </div>
                )
              } else {
                return (
                  <Form>
                    <div className="input">
                      <br/><br/><br/><br/><br/><br/>
                      <br/><br/><br/><br/><br/><br/>
                      <h4>Select page  1-{max_page}</h4>
                      <Input type="number" value={step} min={1} max={max_page} onChange={e => setStep(e.target.value)} />
                      <br/><br/>
                      <Button onClick={TestClick}>Test</Button>
                      <br/><br/>
                      <Button onClick={ReturnClick}>Return</Button>
                    </div>
                  </Form>
                );
              }
            })()
          }
        </div>
      </div>
    </>
  );
}

export default Test
