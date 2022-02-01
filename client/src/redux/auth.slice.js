import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API from "../api";

const initialState = { 
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/fetchLogin',
  async (data, thunkAPI) => {
    const response = await API.Auth.login(data)
    return response
  }
)


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleMeLoading(state, action){
      state.meLoading = action.payload
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      if(action.payload.token){
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
      }
      state.loading = false
    },
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
})

export const toggleMeLoading = authSlice.actions.toggleMeLoading

export default authSlice.reducer