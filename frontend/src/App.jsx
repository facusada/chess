import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password-confirm/:uid/:token" element={<ResetPasswordConfirm />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;