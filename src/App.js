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
import AdminLayout from "./layouts/AdminLayout";
import ApproveTeachersPage from "./pages/AdminPortal/ApproveTeachersPage";
import StudentSubmissionPage from "./pages/StudentSubmissionPage";

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
import QuizProgress from "./pages/TeacherProgressQuiz";
import CreateSessionPage from "./pages/TeacherSessionCreate";
import UpdateSessionPage from "./pages/TeacherSessionUpdate";
import AssignmentInfoPage from "./pages/AssignmentInfoPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import StudentProgressAnalysis from "./pages/StudentProgressAnalysis";
import StudentAssignmentProgress from "./pages/StudentProgressAssignment";
import StudentQuizProgress from "./pages/StudentProgressQuiz";
import StudentCareerPageLayout from "./layouts/StudentCareerPageLayout";
import TeacherCareerPageLayout from "./layouts/TeacherCareerPageLayout";
import ApproveSessionsPage from "./pages/AdminPortal/ApproveSessionsPage";
import TeacherSessionHistoryPage from "./pages/TeacherHistoryPage";
import StudentSessionsHistoryPage from "./pages/StudentHistoryPage";
import StudentGrades from "./pages/TeacherOverallStudentGrades";
import ContactUsPage from "./pages/ContactUsPage";

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
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/contact-us" element={<ContactUsPage/>}/>
      </Route>

      <Route element={<PersistentLogin />}>
        {/* Teacher routes */}
        <Route element={<RequiredAuth allowedRole="Teacher" />}>
          <Route path="/teacher-home-page" element={<TeacherHomePageLayout/>}>
            <Route index element={<TeacherHomePage />} />
            <Route path="sessions" element={<TeacherSessionPage/>} />
            <Route path="chats" element={<ChatPage socket={socket}/>} />
            <Route path="my-profile" element={<TeacherProfilePage/>} />
            <Route path="StudentProfileSecondary" element={<StudentProfilePageSecondary />} />
            <Route path="sessions/assignments-and-quizes" element={<TeacherAssignmentsPage />} />
            <Route path="sessions/assignments/overview" element={<AssignmentInfoPage />} />
            <Route path="progress/assignments" element={<ProgressPage />} />
            <Route path="sessions/assignments/submissons" element={<GradeSubmissions />} />
            <Route path="progress/analysis" element={<TeacherProgressAnalysis />} />
            <Route path="progress/quiz" element={<QuizProgress />} />
            <Route path="sessions/create" element={<CreateSessionPage />} />
            <Route path="sessions/update" element={<UpdateSessionPage />} />
            <Route path="history" element={<TeacherSessionHistoryPage />} />
            <Route path="progress/Individual" element={<StudentGrades />} />

          </Route>

          <Route path="/teacher-career-page" element={<TeacherCareerPageLayout/>}>
            <Route path="career" element={<TeacherCareerPage />} />
            <Route path="careerSignup" element={<CareerSignupPage />} />
          </Route>

          <Route path="/teacher-home-page/sessions/live-session" element={<VideoCallPage2/>} />
        </Route>

        {/* Student routes */}
        <Route element={<RequiredAuth allowedRole="Student" />}>
          <Route path="/student-home-page" element={<StudentHomePageLayout />}>
            <Route index element={<StudentHomePage />} />
            <Route path="chats" element={<ChatPage socket={socket}/>} />
            <Route path="my-profile" element={<StudentProfilePage/>} />
            <Route path="sessions" element={<StudentSessionsPage socket={socket}/>} />
            <Route path="sessions/assignments-and-quizes" element={<StudentAssignmentsPage />} />
            <Route path="StudentProfileSecondary" element={<StudentProfilePageSecondary />} />
            <Route path="results" element={<SearchResultsPage/>}/>
            <Route path="sessions/assignments/submission" element={<StudentSubmissionPage />} />
            <Route path="sessions/quizes/quiz" element={<QuizPage />} />
            <Route path="session-overview" element={<SessionOverviewPage/>} />
            <Route path="progress/assignments" element={<StudentAssignmentProgress/>} />
            <Route path="progress/analysis" element={<StudentProgressAnalysis/>} />
            <Route path="progress/quiz" element={<StudentQuizProgress/>} />
            <Route path="sessions/quizes/quiz-feedback" element={<QuizFeedbackPage />} />
            <Route path="StudentHistory" element={<StudentSessionsHistoryPage />} />

          </Route>

          <Route path="/student-career-page" element={<StudentCareerPageLayout/>}>
            <Route path="ai-career" element={<AICareerGenerator/>} />
            <Route path="available-counsellors" element={<ShowCareerTeachers />} />
            <Route path="my-counsellors" element={<SelectedCareerTeachers />} />
          </Route>
          
          <Route path="/student-home-page/sessions/live-session" element={<VideoCallPage2/>} />
        </Route>

        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="Admin" />}>
          <Route path="/admin-home-page" element={<AdminLayout/>}>
            <Route index element={<ApproveTeachersPage/>} />
            <Route path="sessions" element={<ApproveSessionsPage/>}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
