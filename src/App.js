import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/create" element={<CreateEmployee />}></Route>
          <Route path="/edit/:id" element={<CreateEmployee />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
