import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import LugarDetalles from '../pages/lugarDetalles/LugarDetalles';
import Home from '../pages/home/home';

function AppRouter() {
  return(
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/lugar-detalles' element={<LugarDetalles/>} />
        <Route path='/' element={<Home/>} />

      </Routes>
    </Router>
  )
}

export default AppRouter