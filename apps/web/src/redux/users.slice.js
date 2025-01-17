import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import API from "../api";
const toggleRefetch = createAction('user/toggleRefetch');

const initialState = { 
  items: [],
  total: 0,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  refetch: false
}

export const findUsers = createAsyncThunk(
  'user/fetchUsers',
  async (data, thunkAPI) => {
    const response = await API.Users.find(data)
    return response
  }
)

export const createUser = createAsyncThunk(
    'user/createUser',
    async (data, thunkAPI) => {
      const response = await API.Users.create(data)
      thunkAPI.dispatch(toggleRefetch(true))
      return response
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data, thunkAPI) => {
      const response = await API.Users.update(data.id, data.data)
      thunkAPI.dispatch(toggleRefetch(true))

      return response
    }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage(state, action){
        state.currentPage = action.payload
    },
    toggleRefetch(state, action){
        state.refetch = action.payload
    }
  },
  extraReducers: {
    [findUsers.fulfilled]: (state, action) => {
        state.refetch = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.loading = false;
    },
    [findUsers.pending]: (state, action) => {
      state.loading = true
    },
    [findUsers.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    [createUser.fulfilled]: (state, action) => {
        state.loading = false;
    },
    [createUser.pending]: (state, action) => {
      state.loading = true
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    [updateUser.fulfilled]: (state, action) => {
        state.loading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
})

export const {
    setCurrentPage
  } = usersSlice.actions

export default usersSlice.reducer