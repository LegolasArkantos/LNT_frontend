import { Route, Routes } from "react-router-dom";

import PublicRouteLogin from "./components/PublicRouteLogin";
import PersistentLogin from "./components/PersistentLogin";
import RequiredAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import StudentHomePage from "./pages/StudentHomePage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRouteLogin />}>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PersistentLogin />}>
        {/* Teacher routes */}
        <Route element={<RequiredAuth allowedRole="Teacher" />}></Route>

        {/* Student routes */}
        <Route element={<RequiredAuth allowedRole="Student" />}>
          <Route path="/student-home" element={<StudentHomePage/>} />
        </Route>

        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="Admin" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
