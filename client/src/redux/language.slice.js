import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import API from "../api";
const toggleRefetch = createAction('language/toggleRefetch');

const initialState = { 
  items: [],
  total: 0,
  loading: false,
  error: null,
  refetch: false
}

export const findLanguage = createAsyncThunk(
  'language/fetchLanguage',
  async (data, thunkAPI) => {
    const response = await API.Language.find(data)
    return response
  }
)

export const updateLanguage = createAsyncThunk(
  'language/update',
  async (data, thunkAPI) => {
    const response = await API.Language.update(data.locale, data.data)
    thunkAPI.dispatch(toggleRefetch(true))
    return response
  }
)

export const createLanguage = createAsyncThunk(
  'language/create',
  async (data, thunkAPI) => {
    const response = await API.Language.create(data)
    thunkAPI.dispatch(toggleRefetch(true))
    return response
  }
)


const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleRefetch(state, action){
      state.refetch = action.payload
    }
  },
  extraReducers: {
    [findLanguage.fulfilled]: (state, action) => {
      state.refetch = false
      state.loading = false
      state.items = action.payload.items
      state.total = action.payload.total
    },
    [findLanguage.pending]: (state, action) => {
      state.loading = true
    },
    [findLanguage.rejected]: (state, action) => {
      state.error = action.payload
    },
    [updateLanguage.fulfilled]: (state, action) => {
      state.loading = false
    },
    [updateLanguage.pending]: (state, action) => {
      state.loading = true
    },
    [updateLanguage.rejected]: (state, action) => {
      state.error = action.payload
    },
    [createLanguage.fulfilled]: (state, action) => {
      state.loading = false
    },
    [createLanguage.pending]: (state, action) => {
      state.loading = true
    },
    [createLanguage.rejected]: (state, action) => {
      state.error = action.payload
    }
  }
})


export default languageSlice.reducer