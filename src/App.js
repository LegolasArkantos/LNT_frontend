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
import StudentSessionsPage from "./pages/StudentSessionsPage";
import StudentAssignmentsPage from "./pages/StudentAssignmentsPage";
import ChatPage from "./pages/ChatPage";
import TeacherHomePage from "./pages/TeacherHomePage";
import TeacherHomePageLayout from "./pages/TeacherHomePageLayout";
import AICareerGenerator from "./pages/AICareerGenerator";
import io from "socket.io-client";
import StudentProfilePage from "./pages/StudentProfilePage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import StudentProfilePageSecondary from "./pages/StudentProfilePageSecondary";
import SearchResultsPage from "./pages/SearchResultsPage";

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
            <Route path="chats" element={<ChatPage socket={socket}/>} />
            <Route path="my-profile" element={<TeacherProfilePage/>} />
            <Route path="StudentProfileSecondary" element={<StudentProfilePageSecondary />} />

          </Route>
        </Route>

        {/* Student routes */}
        <Route element={<RequiredAuth allowedRole="Student" />}>
          <Route path="/student-home-page" element={<StudentHomePageLayout />}>
            <Route index element={<StudentHomePage />} />
            <Route path="chats" element={<ChatPage socket={socket}/>} />
            <Route path="my-profile" element={<StudentProfilePage/>} />
            <Route path="ai-career" element={<AICareerGenerator/>} />
            <Route path="sessions" element={<StudentSessionsPage />} />
            <Route path="studentassignments" element={<StudentAssignmentsPage />} />
            <Route path="StudentProfileSecondary" element={<StudentProfilePageSecondary />} />
            <Route path="results" element={<SearchResultsPage/>}/>

          </Route>
        </Route>

        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="Admin" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
