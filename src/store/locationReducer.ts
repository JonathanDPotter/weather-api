import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import { loadState } from "./localStorage";
// interfaces
import Icoords from "../interfaces/coords";

interface IlocationSliceState {
  coords: { latitude: string; longitude: string };
}

const persistedState = loadState();

const initialState = persistedState.auth
  ? ({
      coords: persistedState.coords,
    } as IlocationSliceState)
  : ({ coords: { latitude: "", longitude: "" } } as IlocationSliceState);

const locationSlice = createSlice({
  name: "coords",
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<Icoords>) => {
      state.coords = action.payload;
    },
  },
});

export const { setCoords } = locationSlice.actions;

export default locationSlice.reducer;
