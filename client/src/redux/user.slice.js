import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API from "../api";

const initialState = { 
  isAuth: false,
  userInfo: {
    rules: []
  },
  loading: true,
  error: null
}

export const getMe = createAsyncThunk(
  'user/fetchMe',
  async (data, thunkAPI) => {
    const response = await API.Auth.me()
    return response
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleMeLoading(state, action){
      state.loading = action.payload
    }
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.userInfo = action.payload;
    },
    [getMe.pending]: (state, action) => {
      state.loading = true;
    },
    [getMe.rejected]: (state, action) => {
      state.isAuth = false;
      state.loading = false;
      localStorage.removeItem("token");
      state.error = action.error;
    }
  }
})

// export const isAllowed = (rule) => {
//   const {rules = []} = store.getState().user;
//   return rules.includes(rule);
//   return true
// }

export const toggleMeLoading = userSlice.actions.toggleMeLoading

export default userSlice.reducer