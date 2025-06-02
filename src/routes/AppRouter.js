import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LugarDetalles from '../pages/lugarDetalles/LugarDetalles';

function AppRouter() {
  return(
    <Router>
      <Routes>
          <Route path='/' element={<LugarDetalles/>} />
      </Routes>
    </Router>
  )
}

export default AppRouter