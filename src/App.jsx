import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Iccr from './pages/iccr'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
function App() {
  
  return (
      <BrowserRouter>
        <Routes>
         
          <Route path='/' element={<Iccr />}></Route>
         
        </Routes>
      </BrowserRouter>
  );
}


export default App


