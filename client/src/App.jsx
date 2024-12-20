import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Service from './pages/Service'
import { AdminLayout } from './components/layouts/AdminLayout'
import { AdminContact } from './components/layouts/AdminContact'
import { AdminUser } from './components/layouts/AdminUser'
import AdminUpdate from './components/layouts/AdminUpdate'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='user' element={<AdminUser/>}/>
          <Route path='contact' element={<AdminContact/>}/>
          <Route path='user/:id/update' element={<AdminUpdate/>}/>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App