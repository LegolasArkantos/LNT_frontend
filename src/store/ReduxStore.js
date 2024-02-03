import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import userStudentReducer from "../features/studentProfile";
import userTeacherReducer from "../features/teacherProfile";

export const ReduxStore = configureStore({
  reducer: {
    auth: authReducer,
    studentProfile: userStudentReducer,
    teacherProfile: userTeacherReducer,
  },
});
