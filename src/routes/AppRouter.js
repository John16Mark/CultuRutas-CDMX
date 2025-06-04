import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import LugarDetalles from '../pages/lugarDetalles/LugarDetalles';

function AppRouter() {
  return(
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<LugarDetalles/>} />
          
      </Routes>
    </Router>
  )
}

export default AppRouter