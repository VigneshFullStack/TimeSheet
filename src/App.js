import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeTasksTable from "./Components/EmployeeTasksTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeTasksTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
