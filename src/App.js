import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeTasksTable from "./Components/EmployeeTasksTable";
import Login from "./Components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<EmployeeTasksTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
