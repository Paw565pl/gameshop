import { createSlice } from "@reduxjs/toolkit";

type Ordering =
  | ""
  | "name"
  | "-name"
  | "released"
  | "-released"
  | "metacritic"
  | "-metacritic"
  | "price"
  | "-price";

interface GameQueryState {
  name: string;
  min_release_year: string;
  max_release_year: string;
  min_metacritic: string;
  max_metacritic: string;
  min_price: string;
  max_price: string;
  genre: string;
  platform: string;
  developer: string;
  ordering: Ordering;
}

export const initialGameQuery: GameQueryState = {
  name: "",
  min_release_year: "",
  max_release_year: "",
  min_metacritic: "",
  max_metacritic: "",
  min_price: "",
  max_price: "",
  genre: "",
  platform: "",
  developer: "",
  ordering: "",
};

const gameQuerySlice = createSlice({
  name: "gameQuery",
  initialState: initialGameQuery,
  reducers: {
    setName: (_, action) => {
      return { ...initialGameQuery, name: action.payload };
    },
    setMinReleaseYear: (state, action) => {
      state.min_release_year = action.payload;
    },
    setMaxReleaseYear: (state, action) => {
      state.max_release_year = action.payload;
    },
    setMinMetacritic: (state, action) => {
      state.min_metacritic = action.payload;
    },
    setMaxMetacritic: (state, action) => {
      state.max_metacritic = action.payload;
    },
    setMinPrice: (state, action) => {
      state.min_price = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.max_price = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setDeveloper: (state, action) => {
      state.developer = action.payload;
    },
    setOrdering: (state, action) => {
      state.ordering = action.payload;
    },
  },
});

export const { actions } = gameQuerySlice;

export default gameQuerySlice.reducer;
