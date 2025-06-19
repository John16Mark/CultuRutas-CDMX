import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';

import Lugares from '../pages/lugares/Lugares';
import LugarDetalles from '../pages/lugarDetalles/LugarDetalles';
import LugarRepositorio from '../pages/lugarRepositorio/LugarRepositorio';
import Home from '../pages/home/home';

function AppRouter() {
  return(
    <Router>
      <Routes>
        <Route path='/registro' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        <Route path='/lugares' element={<Lugares/>} />
        <Route path='/lugar-detalles' element={<LugarDetalles/>} />
        <Route path='/lugar-repositorio' element={<LugarRepositorio/>} />
        <Route path='/' element={<Home/>} />

      </Routes>
    </Router>
  )
}

export default AppRouter