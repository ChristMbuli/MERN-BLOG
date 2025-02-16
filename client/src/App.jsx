import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SinglePost from './pages/SinglePost'
import Form from './pages/Form'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new' element={<Form />} />
        <Route path="/:id" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App