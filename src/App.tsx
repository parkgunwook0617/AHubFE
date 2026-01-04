import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './base/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import MainPage from './base/MainPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
