import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button3 } from './AuthForms';

function Contents() {
  const params = useParams();
  const navigate = useNavigate();

  function handleReturnClick() {
    navigate('/');
  }

  return (
    <Form>
      <div>
        <h3>User contents.</h3>
        <br/>
        <Button3 onClick={handleReturnClick} >Return</Button3>
      </div>
    </Form>
  )
}

export default Contents;
