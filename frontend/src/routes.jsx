import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UserPage from "./pages/UserPage";

const ReactRouterSetup = () => {
  return (
    <>
      {/* BrowserRouter keeps our UI in sync with url*/}
      <Router>
        {/* all routes must be inside Routes */}
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default ReactRouterSetup;
