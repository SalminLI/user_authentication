import React from 'react'
import {useNavigate} from "react-router-dom";
import {Form,Button} from './AuthForms';

const Home = () => {
  const navigate = useNavigate();
  function LoadFilesClick(e: React.ChangeEvent<HTMLInputElement>) {
    navigate({
      pathname: '/load',
    });
  }
  function TrainingClick(e: React.ChangeEvent<HTMLInputElement>) {
    navigate({
      pathname: '/train',
    });
  }

  return (
  <>
    <Form>
      <div>
        <br/><br/><br/><br/>
        <h4>IT Inglish - Russian Dictionary </h4>
        <br/>
        <Button onClick={LoadFilesClick} >Load</Button>
        <Button onClick={TrainingClick} >Training</Button>
       </div>
    </Form>
  </>
 );
}

export default Home
