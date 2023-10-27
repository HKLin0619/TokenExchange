import './App.css';
import About from './Routes/About';
import Home from './Routes/Home';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  );
}
