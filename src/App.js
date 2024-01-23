
import Login from './components/login/Login';
import AdminLogin from './components/login/AdminLogin';
import Home from './components/Home';
import Inventory from './components/Inventory';
import FttbMaterials from './components/FttbMaterials';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRegisterUsers from './components/Admin/AdminRegisterUsers';
import Decommisioning from './components/Decommisioning';
import Reports from './components/Reports';
import Pricing from './components/Pricing';



function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/AdminLogin" element={<AdminLogin />}></Route>
      <Route path="/" element={<Login />}></Route>
    
      <Route path="/AdminRegisterUsers" element={<AdminRegisterUsers/>}></Route>



      <Route path="/home" element={<Home />}></Route>
      <Route path="/Inventory" element={<Inventory />}></Route>
      <Route path="/Decommisioning" element={<Decommisioning/>}></Route>
      <Route path="/FttbMaterials" element={<FttbMaterials />}></Route>
      <Route path="/Pricing" element={<Pricing />}></Route>
      <Route path="/Reports" element={<Reports/>}></Route>
      
    </Routes>
  </BrowserRouter>

  );
}

export default App;

