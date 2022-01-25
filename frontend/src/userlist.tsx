import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button3 } from './AuthForms';

const GET_USERS = gql`
  query {
    users {
      name
      password
    }
  }
`

interface User {
  name: string;
  password: string;
}

function UserList() {
  const params = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS, {fetchPolicy: 'network-only'});

  if (loading) {
    return (<div> Loading...</div>)
  }

  if (error) {
    return (<div>Error : {JSON.stringify(error)}</div>)
  }

  function handleReturnClick() {
    navigate('/');
  }

  return (
    <Form>
      <div>
        <h3>UserList.</h3>
        <ul>
          {!data ? <p>No users to display.</p> :
            data.users.map(user => (
            <li>
              <p>{user.name}</p>
            </li>
          ))
         }
        </ul>
      </div>
      <div>
        <Button3 onClick={handleReturnClick} >Return</Button3>
      </div>
    </Form>
  )
}

export default UserList;
