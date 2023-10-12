import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Register from './components/Register';
import Login from './components/Login';
import "react-toastify/dist/ReactToastify.css";
import HomePage from './components/HomePage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/homepage' element={<HomePage/>}/>
    </Routes>
    </>
  );
}

export default App;
