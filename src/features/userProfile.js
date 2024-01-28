import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userProfile",
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
    profile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { profile } = userSlice.actions;

export default userSlice.reducer;
