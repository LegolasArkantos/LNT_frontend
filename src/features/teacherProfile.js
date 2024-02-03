import { createSlice } from "@reduxjs/toolkit";

export const userTeacherSlice = createSlice({
  name: "teacherProfile",
  initialState: {
    value: {
      firstName: "",
      lastName: "",
      profileID: "",
      profilePicture: "",
      educationalCredentials: [],
      subjectsTaught: [],
      rating: "",
      availableTimeSlots: [],
      students: [],
      sessions: [],
      chatRooms: [],
      personality: [],
      careerCounselling: false
    },
  },
  reducers: {
    teacherProfile: (state, action) => {
      state.value = action.payload;
    },
    removeTeacherProfile: (state) => {
      state.value = state.initialState;
    }
  },
});

export const { teacherProfile, removeTeacherProfile } = userTeacherSlice.actions;

export default userTeacherSlice.reducer;
