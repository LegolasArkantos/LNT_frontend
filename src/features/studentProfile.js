import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "studentProfile",
  initialState: {
    value: {
      firstName: "",
      lastName: "",
      profileID: "",
      profilePicture: "",
      educationalLevel: "",
      teachers: [],
      sessions: [],
      chatRooms: [],
      personality: [],
    },
  },
  reducers: {
    studentProfile: (state, action) => {
      state.value = action.payload;
    },
    removeStudentProfile: (state) => {
      state.value = state.initialState;
    }
  },
});

export const { studentProfile, removeStudentProfile } = userSlice.actions;

export default userSlice.reducer;
