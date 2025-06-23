import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';

import Home from '../pages/home/Home';
import Mapa from '../pages/mapa/Mapa';
import Lugares from '../pages/lugares/Lugares';
import LugarDetalles from '../pages/lugarDetalles/LugarDetalles';
import LugarRepositorio from '../pages/lugarRepositorio/LugarRepositorio';

function AppRouter() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/mapa' element={<Mapa/>} />
        
        <Route path='/registro' element={<Register/>} />
        <Route path='/login' element={<Login/>} />

        <Route path='/lugares' element={<Lugares/>} />
        <Route path='/lugar/:id/:nombre' element={<LugarDetalles/>} />
        <Route path='/lugar/:id/:nombre/repositorio' element={<LugarRepositorio/>} />

      </Routes>
    </Router>
  )
}

export default AppRouter