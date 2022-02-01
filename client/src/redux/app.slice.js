import API from "../api";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getStatistics = createAsyncThunk(
  'app/fetchStatistics',
  async (_, thunkAPI) => {
    const response = await API.App.statistics()
    return response
  }
)

const initialState = { 
  error: null,
  loading: true,
  notification: null,
  statistics: {
    namespaces: 0,
    users: 0,
    locales: 0,
    keys: 0,
  }
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleLoading(state, action){
      state.loading = action.payload
    },
    clearError(state, action){
      state.error = null;
    },
    clearNotification(state){
      state.notification = null;
    }
  },
  extraReducers: {
    [getStatistics.pending]: (state, action) => {
      state.loading = true
    },
    [getStatistics.fulfilled]: (state, action) => {
      state.loading = false;
      state.statistics = action.payload
    },
    [getStatistics.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'user/fetchMe/pending': (state, action) => {
      state.loading = true
    },
    'user/fetchMe/fulfilled': (state, action) => {
      state.loading = false
    },
    'user/fetchMe/rejected': (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'translations/saveAll/fulfilled': (state, action) => {
      state.notification = {
        message: "Translations successfully saved!"
      }
    },
    'language/fetchLanguage/fulfilled': (state, action) => {
      state.loading = false
    },
    'language/fetchLanguage/pending': (state, action) => {
      state.loading = true
    },
    'language/fetchLanguage/rejected': (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'language/update/rejected': (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'language/update/pending': (state, action) => {
      state.loading = true
    },
    'language/update/fulfilled': (state, action) => {
      state.loading = false
      state.notification = {
        message: "Language successfully saved!"
      }
    },
    'language/create/rejected': (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'language/create/pending': (state, action) => {
      state.loading = true
    },
    'language/create/fulfilled': (state, action) => {
      state.loading = false
      state.notification = {
        message: "Language successfully saved!"
      }
    },
    'namespace/update/rejected': (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'namespace/update/pending': (state, action) => {
      state.loading = true
    },
    'namespace/update/fulfilled': (state, action) => {
      state.loading = false
      state.notification = {
        message: "Namespace successfully saved!"
      }
    },
    'namespace/create/rejected': (state, action) => {
      state.loading = false
      state.error = action.error
    },
    'namespace/create/pending': (state, action) => {
      state.loading = true
    },
    'namespace/create/fulfilled': (state, action) => {
      state.loading = false
      state.notification = {
        message: "Namespace successfully saved!"
      }
    }
  }
})

export const { 
    toggleLoading,
    clearNotification,
    clearError
} = appSlice.actions

export default appSlice.reducer