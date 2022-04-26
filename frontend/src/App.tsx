import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginUsers from './users';
import UserList from './userlist';
import Contents from './worklist';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<LoginUsers />} />
            <Route path="/admin/:auth/:name/:pass" element={<UserList />}/>
            <Route path="/contents/:auth/:name/:pass" element={<Contents />} />
          </Routes>
        </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
