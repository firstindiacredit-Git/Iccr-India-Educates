import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Iccr from './pages/iccr'
import IccrForm from './components/iccrForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
function App() {
  
  return (
      <BrowserRouter>
        <Routes>
         
          <Route path='/' element={<Iccr />}></Route>
          <Route path='/iccr-form45fffefre454ff5feerffffer' element={<IccrForm />}></Route>
         
        </Routes>
      </BrowserRouter>
  );
}


export default App


