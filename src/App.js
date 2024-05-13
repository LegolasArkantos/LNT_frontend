import { Route, Routes } from "react-router-dom";

import PublicRouteLogin from "./components/PublicRouteLogin";
import PersistentLogin from "./components/PersistentLogin";
import RequiredAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import StudentHomePage from "./pages/StudentHomePage";
import LandingPage from "./pages/LandingPage";
import StudentHomePageLayout from "./layouts/StudentHomePageLayout";
import SignUpPage1 from "./pages/SignupPage1";
import SignUpPage2 from "./pages/SignupPage2";
import SignUpPage3 from "./pages/SignupPage3";
import TeacherSessionPage from "./pages/TeacherSessionPage";
import StudentSessionsPage from "./pages/StudentSessionsPage";
import StudentAssignmentsPage from "./pages/StudentAssignmentsPage";
import ChatPage from "./pages/ChatPage";
import TeacherHomePage from "./pages/TeacherHomePage";
import TeacherHomePageLayout from "./layouts/TeacherHomePageLayout";
import AICareerGenerator from "./pages/AICareerGenerator";
import io from "socket.io-client";
import StudentProfilePage from "./pages/StudentProfilePage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import StudentProfilePageSecondary from "./pages/StudentProfilePageSecondary";
import SearchResultsPage from "./pages/SearchResultsPage";
import TeacherAssignmentsPage from "./pages/TeacherAssignmentsPage";
import StudentResponsesPage from "./pages/StudentResponsesPage";
import AdminLayout from "./layouts/AdminLayout";
import ApproveTeachersPage from "./pages/AdminPortal/ApproveTeachersPage";
import StudentSubmissionPage from "./pages/StudentSubmissionPage";
import VideoCallPage from "./pages/VideoCallPage";

import VideoCallPage2 from "./pages/VideoCallPage2";
import TeacherProgressAnalysis from "./pages/TeacherProgressAnalysis";
import GradeSubmissions from "./pages/GradeSubmissions";
import ProgressPage from "./pages/TeacherProgress";
import TeacherCareerPage from "./pages/TeacherCareer";
import CareerSignupPage from "./pages/TeacherCareerSignup";
import QuizPage from "./pages/QuizPage";
import QuizFeedbackPage from "./pages/QuizFeedbackPage";


import ShowCareerTeachers from "./pages/ShowCareerTeachers";
import SelectedCareerTeachers from "./pages/SelectedCareerTeachers";
import PersonalityTestInformation from "./pages/PersonalityTestInformation";
import SessionOverviewPage from "./pages/SessionOverviewPage";


const socket = io.connect(process.env.REACT_APP_BASE_URL);






function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRouteLogin />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage1 />} />
        <Route path="/signup2" element={<SignUpPage2 />} />
        <Route path="/personalityTestInformation" element={<PersonalityTestInformation/>} />
        <Route path="/signup3" element={<SignUpPage3 />} />
      </Route>

      <Route element={<PersistentLogin />}>
        {/* Teacher routes */}
        <Route element={<RequiredAuth allowedRole="Teacher" />}>
          <Route path="/teacher-home-page" element={<TeacherHomePageLayout/>}>
            <Route index element={<TeacherHomePage />} />
            <Route path="sessions" element={<TeacherSessionPage socket={socket}/>} />
            <Route path="chats" element={<ChatPage socket={socket}/>} />
            <Route path="my-profile" element={<TeacherProfilePage/>} />
            <Route path="StudentProfileSecondary" element={<StudentProfilePageSecondary />} />
            <Route path="assignments" element={<TeacherAssignmentsPage />} />
            <Route path="responses" element={<StudentResponsesPage />} />

            <Route path="progress" element={<ProgressPage />} />

            <Route path="submissons" element={<GradeSubmissions />} />
            <Route path="career" element={<TeacherCareerPage />} />
            <Route path="careerSignup" element={<CareerSignupPage />} />
            <Route path="analysis" element={<TeacherProgressAnalysis />} />





          </Route>
          <Route path="/teacher-home-page/live-session" element={<VideoCallPage2/>} />
        </Route>

        {/* Student routes */}
        <Route element={<RequiredAuth allowedRole="Student" />}>
          <Route path="/student-home-page" element={<StudentHomePageLayout />}>
            <Route index element={<StudentHomePage />} />
            <Route path="chats" element={<ChatPage socket={socket}/>} />
            <Route path="my-profile" element={<StudentProfilePage/>} />
            <Route path="ai-career" element={<AICareerGenerator/>} />
            <Route path="sessions" element={<StudentSessionsPage socket={socket}/>} />
            <Route path="studentassignments" element={<StudentAssignmentsPage />} />
            <Route path="StudentProfileSecondary" element={<StudentProfilePageSecondary />} />
            <Route path="results" element={<SearchResultsPage/>}/>
            <Route path="submission" element={<StudentSubmissionPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="teacherCareers" element={<ShowCareerTeachers />} />
            <Route path="Counselors" element={<SelectedCareerTeachers />} />
            <Route path="session-overview" element={<SessionOverviewPage/>} />


            <Route path="quiz-feedback-page" element={<QuizFeedbackPage />} />

          </Route>
          <Route path="/student-home-page/live-session" element={<VideoCallPage2/>} />
        </Route>

        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="Admin" />}>
          <Route path="/admin-home-page" element={<AdminLayout/>}>
            <Route index element={<ApproveTeachersPage/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
