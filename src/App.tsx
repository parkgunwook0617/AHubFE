import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './base/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import MainPage from './base/MainPage'
import DetailPage from './base/DetailPage'
import Search from './base/Search'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './base/Profile'
import IndividualList from './base/IndividualList'
import axios from 'axios'

axios.defaults.withCredentials = true;

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/detail/:title" element={<DetailPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/individuallist" element={<IndividualList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
