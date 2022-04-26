import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Button2 } from './AuthForms';

const GET_USER = gql`
  query ($name: String!) {
    user (name: $name) {
      name
      password
    }
  }
`

const ADD_USER = gql`
  mutation AddUser($name: String!, $password: String!){
    addUser(name: $name, password: $password) {
      name
      password
    }
  }
`;

function LoginUsers() {
  const [active, setActive] = useState(false);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [prevname, setPrevName] = useState('');
  const [log, setLogin] = useState(false);
  const [reg, setRegister] = useState(false);
  const [message, setMessage] = useState('message...');

  const [getUser, { loading: getloading, error: geterror, data: getdata }] = useLazyQuery(GET_USER,{ 
    fetchPolicy: 'network-only' });
  const [addUser, { loading: addloading, error: adderror, data: userdata }] = useMutation(ADD_USER,{
    fetchPolicy: 'network-only' });

  const navigate = useNavigate();

  useEffect(() => {
    control(log,reg);
  }, [getdata]);

  function control(n_log: any,n_reg: any) {
    let msg = '';
    if (n_log) {
      if (getdata!=null && getdata.user!=null) { 
        if (getdata.user.password===password.trim()) {
          msg = 'Your password has been verified.';
          setMessage(msg);
          setActive(true); 
        } else {
          msg = 'Invalid password.';
          setMessage(msg);
        }
      } else {
        msg = 'Unknown user - ' + username;
        setMessage(msg);
      }
      setLogin(false);
    } else {
      if (n_reg) {
        if (getdata!=null && getdata.user!=null) { 
          msg = 'User ' + username + ' allready exist.'; 
          setMessage(msg);
          setActive(false);
        } else {
          addUser({ variables: {name: username.trim(), password: password.trim()}});
        }
      }
      setRegister(false);
    }
  };

  useEffect(() => {
    if (!userdata) return;
    let msg = '';
    if (userdata!=null && userdata.addUser!=null) { 
      if (userdata.addUser.name===username.trim() && userdata.addUser.password===password.trim()) { 
        msg = 'New user ' + username + ' created.';
        setMessage(msg);
        setPrevName('');
        setActive(true);
      }
    } else {
      msg = 'Error creating new user.'; 
      setMessage(msg);
    }
  }, [userdata]);

  if (getloading) {
    return (<div> GetLoading...</div>)
  }

  if (addloading) {
    return (<div> AddLoading...</div>)
  }

  if (geterror) {
    return (<div>GetError : {JSON.stringify(geterror)}</div>)
  }

  if (adderror) {
    return (<div>AddError : {JSON.stringify(adderror)}</div>)
  }

  function handleLogClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (username.trim()==='' || password.trim()==='') {
      setMessage('Empty name or password.');
      return;
    }
    e.preventDefault();
    setLogin(true);
    if (username.trim()===prevname) {
      control(true,false);
    } else {
      setPrevName(username.trim());
      getUser({ variables: { name: username.trim() }});
    }
  };

  function handleRegClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (username.trim()==='' || password.trim()==='') {
      setMessage('Empty name or password.');
      return;
    }
    e.preventDefault();
    setRegister(true);
    if (username.trim()===prevname) {
      control(false,true);
    } else {
      setPrevName(username.trim());
      getUser({ variables: { name: username.trim() }});
    }
  };

  function handleCompleteClick() {
    let name = username.trim()
    let pass = password.trim()
    setName('');
    setPassword('');
    if (name==='admin') {
      navigate({
        pathname: '/admin/true/' + name + '/' + pass,
      });
    } else {
      navigate({
        pathname: '/contents/true/' + name + '/' + pass,
      });
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (active) setActive(false);
    setName(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (active) setActive(false);
    setPassword(e.target.value);
  }

  return (
  <>
  <Form>
    <div>
      <h3>Users authentication.</h3>
      <Input type="text" placeholder= "Username" value={username} onChange={handleNameChange}/>
      <br/> <br/>
      <Input type="text" placeholder= "Password" value={password} onChange={handlePasswordChange}/>
      <br/> <br/>
      <Button onClick={handleLogClick} >Login</Button>
      <Button onClick={handleRegClick} >Register</Button>
    </div>
    <div>
      <br/> {message} <br/>
    </div>
    <div>
      <br/>
      {!active ? <p> - Continue - </p> :
        <Button2 onClick={handleCompleteClick} >Continue</Button2>
      }
    </div>
  </Form>
  </>
  );
}

export default LoginUsers;
