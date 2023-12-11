
import Appbar from './components/Menubar';
import Login from './components/login/Login';
import AdminLogin from './components/login/AdminLogin';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/home" element={<Home />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/AdminLogin" element={<AdminLogin />}></Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;


<div className="App">
<Login/>
</div>