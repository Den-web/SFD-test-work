import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIState = {
  sidebarCollapsed: boolean;
};

const initialState: UIState = {
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { setSidebarCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
