import { Route, Routes } from "react-router-dom";

import PublicRouteLogin from "./components/PublicRouteLogin";
import PersistentLogin from "./components/PersistentLogin";
import RequiredAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import StudentHomePage from "./pages/StudentHomePage";
import LandingPage from "./pages/LandingPage";
import StudentHomePageLayout from "./pages/StudentHomePageLayout";
import SignUpPage1 from "./pages/SignupPage1";
import SignUpPage2 from "./pages/SignupPage2";
import SignUpPage3 from "./pages/SignupPage3";
import TeacherSessionPage from "./pages/TeacherSessionPage";
import ChatPage from "./pages/ChatPage";
import TeacherHomePage from "./pages/TeacherHomePage";
import TeacherHomePageLayout from "./pages/TeacherHomePageLayout";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

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
        {/* Teacher routes */}
        <Route element={<RequiredAuth allowedRole="Teacher" />}>
          <Route path="/teacher-home-page" element={<TeacherHomePageLayout/>}>
            <Route index element={<TeacherHomePage />} />
            <Route path="sessions" element={<TeacherSessionPage />} />
          </Route>
        </Route>

        {/* Student routes */}
        <Route element={<RequiredAuth allowedRole="Student" />}>
          <Route path="/student-home-page" element={<StudentHomePageLayout />}>
            <Route index element={<StudentHomePage />} />
            <Route path="chats" element={<ChatPage socket={socket}/>} />
          </Route>
        </Route>

        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="Admin" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
