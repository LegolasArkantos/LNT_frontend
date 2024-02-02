import { Route, Routes } from "react-router-dom";

import PublicRouteLogin from "./components/PublicRouteLogin";
import PersistentLogin from "./components/PersistentLogin";
import RequiredAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import StudentHomePage from "./pages/StudentHomePage";
import LandingPage from "./pages/LandingPage";
import HomePageLayout from "./pages/HomePageLayout";
import SignUpPage1 from "./pages/SignupPage1";
import SignUpPage2 from "./pages/SignupPage2";
import SignUpPage3 from "./pages/SignupPage3";
import TeacherSessionPage from "./pages/TeacherSessionPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRouteLogin />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage1 />} />
        <Route path="/signup2" element={<SignUpPage2 />} />
        <Route path="/signup3" element={<SignUpPage3 />} />

      </Route>

      <Route element={<PersistentLogin />}>
        <Route path="/home-page" element={<HomePageLayout />}>

          {/* Teacher routes */}
          <Route element={<RequiredAuth allowedRole="Teacher" />}>
            <Route path="Session" element={<TeacherSessionPage />} />
          </Route>

          {/* Student routes */}
          <Route element={<RequiredAuth allowedRole="Student" />}>
            <Route index element={<StudentHomePage />} />
            <Route path="chats" element={<ChatPage/>} />
          </Route>

        </Route>

        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="Admin" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
