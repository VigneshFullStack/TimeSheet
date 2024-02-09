import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeTasksTable from "./Components/EmployeeTasksTable";
import Login from "./Components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./Redux/Store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<EmployeeTasksTable />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </Provider>
  );
}

export default App;
