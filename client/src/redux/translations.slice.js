import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import API from "../api";
import _ from "lodash";
import {updateEntry} from "../general/helpers";

const toggleRefetch = createAction('translations/toggleRefetch');

export const findTranslations = createAsyncThunk(
  'translations/fetchTranslations',
  async (data, thunkAPI) => {
    const response = await API.Translation.find(data)
    return response
  }
)

export const saveAll = createAsyncThunk(
  'translations/saveAll',
  async (data, thunkAPI) => {
    const {update, create, remove} = data;
    if(update.length) await API.Translation.bulkUpdate(update)
    if(create.length) await API.Translation.bulkCreate(create)
    if(remove.length) await API.Translation.bulkRemove(remove)
    thunkAPI.dispatch(toggleRefetch(true))
    return true
  }
)

const formateItems = (items) => {
  const result = [];
  for (const key of items) {
      let item = {
          id: key.id,
          key: key.id,
          keyName: key.key
      }

      for (const translation of key.translations) {
          item[`${translation.locale.locale}:text`] = translation.text
      }
      result.push(item);
  }
  return result;
}

const initialState = { 
  refetch: false,
  originItems: [],
  editMode: false,
  touched: false,
  items: [],
  total: 0,
  loading: false,
  error: null,
  pageSize: 10,
  currentPage: 1,
}

const translationSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    toggleRefetch(state, action){
      state.refetch = action.payload
    },
    toggleEditMode(state, action){
      state.editMode = action.payload
    },
    resetChanges(state){
      state.items = formateItems(state.originItems);
      state.touched = false;
    },
    setCurrentPage(state, action){
      state.currentPage = action.payload
    },
    createTranslation(state, action){
      state.items.unshift({...action.payload, created: true});
      state.touched = true;
    },
    updateTranslation(state, action){
      state.items = updateEntry(state.items, {...action.payload, updated: true});
      state.touched = true;
    },
    removeTranslation(state, action){
      state.items = updateEntry(state.items, {...action.payload, removed: true});
      state.touched = true;
    },
    restoreTranslation(state, action){
      state.items = updateEntry(state.items, {...action.payload, removed: false});
      state.touched = true;
    }
  },
  extraReducers: {
    [findTranslations.fulfilled]: (state, action) => {
      state.refetch = false
      state.loading = false
      state.originItems = action.payload.items;
      state.items = formateItems(action.payload.items);
      state.total = action.payload.total
    },
    [findTranslations.pending]: (state, action) => {
      state.loading = true
      state.items = []
      state.originItems = []
      state.total = 0
    },
    [findTranslations.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.items = []
      state.originItems = []
      state.total = 0
      state.editMode = false
      state.touched = false
    },
    [saveAll.fulfilled]: (state, action) => {
      state.loading = false
      state.touched = false
      state.editMode = false
      state.currentPage = 1
    },
    [saveAll.pending]: (state, action) => {
      state.loading = true
    },
    [saveAll.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
      state.editMode = false
      state.touched = false
      state.currentPage = 1
    },
  }
})

export const {
  createTranslation,
  updateTranslation,
  removeTranslation,
  restoreTranslation,
  setCurrentPage,
  resetChanges,
  toggleEditMode
} = translationSlice.actions


export default translationSlice.reducer