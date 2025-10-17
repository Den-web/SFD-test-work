import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  name: string | null;
};

const initialState: UserState = {
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string | null>) {
      state.name = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
