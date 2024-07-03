import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import List from "./pages/List/List";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-admin">
        <Sidebar />
        <Routes>
          <Route/>
         <Route path="/add" element={<Add/>} />
           <Route path="/list" element={<List/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;