import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/log-in" element={<LoginForm />} />

      {/* Private routes */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
