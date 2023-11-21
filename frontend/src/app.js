import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './home'
import Load from './load'
import Training from './train'
import Test from './test'
import NotFound from './notfound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="load" element={<Load />} />
      <Route path="train" element={<Training />} />
      <Route path="test/:group" element={<Test />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
