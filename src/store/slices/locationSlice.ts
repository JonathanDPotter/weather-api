import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import { loadState } from "../localStorage";
// interfaces
import Icoords from "../../interfaces/coords";

export enum zipOrNav {
  Zip = "ZIP",
  Nav = "NAV",
}

interface IlocationSliceState {
  navCoords: Icoords | null;
  zipCoords: Icoords | null;
  selectedLocation: zipOrNav;
}

const persistedState = loadState();

const initialState = persistedState
  ? ({
      navCoords: persistedState.navCoords,
      zipCoords: persistedState.zipCoords,
      selectedLocation: zipOrNav.Nav,
    } as IlocationSliceState)
  : ({
      navCoords: null,
      zipCoords: null,
      selectedLocation: zipOrNav.Nav,
    } as IlocationSliceState);

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setNavCoords: (state, action: PayloadAction<Icoords>) => {
      state.navCoords = action.payload;
    },
    setZipCoords: (state, action: PayloadAction<Icoords>) => {
      state.zipCoords = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      if (action.payload === "ZIP") state.selectedLocation = zipOrNav.Zip;
      if (action.payload === "NAV") state.selectedLocation = zipOrNav.Nav;
    },
  },
});

export const { setNavCoords, setZipCoords, setSelectedLocation } =
  locationSlice.actions;

export default locationSlice.reducer;
