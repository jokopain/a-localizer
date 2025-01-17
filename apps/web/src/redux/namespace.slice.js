import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import API from "../api";
import {keysToJSON} from "../general/helpers";
export const toggleRefetch = createAction('namespace/toggleRefetch');
export const changeExportStatus = createAction('namespace/changeExportStatus');
const setExportData = createAction('namespace/setExportData');

const initialState = { 
  items: [],
  total: 0,
  loading: false,
  error: null,
  refetch: false,
  exportStatus: "",
  exportPercent: 0,
  exportData: null,
  pageSize: 10
}

export const findNamespaces = createAsyncThunk(
  'namespace/fetchNamespace',
  async (data, thunkAPI) => {
    const response = await API.Namespace.find(data)
    return response
  }
)

export const updateNamespaces = createAsyncThunk(
  'namespace/update',
  async (data, thunkAPI) => {
    const response = await API.Namespace.update(data.slug, data.data)
    thunkAPI.dispatch(toggleRefetch(true))

    return response
  }
)


export const createNamespaces = createAsyncThunk(
  'namespace/create',
  async (data, thunkAPI) => {
    const response = await API.Namespace.create(data)
    thunkAPI.dispatch(toggleRefetch(true))

    return response
  }
)

export const exportOneNamespace = createAsyncThunk(
  'namespace/exportOne',
  async (data, thunkAPI) => {
    const {slug} = data
    const {items: languages} = thunkAPI.getState().language
    thunkAPI.dispatch(changeExportStatus({
      text: "Getting Namespace Info",
      percent: 15
    }))
    const translationsCountResp = await API.Translation.find({
      limit:0,
      offset:0,
      namespace: slug
    })

    thunkAPI.dispatch(changeExportStatus({
      text: "Getting Namespace Keys",
      percent: 30
    }))
    const total = translationsCountResp.total;

    thunkAPI.dispatch(changeExportStatus({
      text: `Found ${languages.length} languages`,
      percent: 50
    }))
    const translations = await API.Translation.find({
      limit: total,
      offset:0,
      namespace: slug
    })
    
    thunkAPI.dispatch(changeExportStatus({
      text: `Generating JSONs`,
      percent: 65
    }))

    const locales = await keysToJSON(translations.items, languages)
    thunkAPI.dispatch(setExportData({slug, locales}))
    return true
  }
)


const namespaceSlice = createSlice({
  name: 'namespace',
  initialState,
  reducers: {
    toggleRefetch(state, action){
      state.refetch = action.payload
    },
    changeExportStatus(state, action){
      state.exportStatus = action.payload
    },
    changeExportPercent(state, action){
      state.exportPercent = action.payload
    },
    setExportData(state, action){
      state.exportData = action.payload
    },
    setPageSize(state, action){
      state.pageSize = action.payload
    }
  },
  extraReducers: {
    [findNamespaces.fulfilled]: (state, action) => {
      state.refetch = false
      state.loading = false
      state.items = action.payload.items
      state.total = action.payload.total
    },
    [findNamespaces.pending]: (state, action) => {
      state.loading = true
    },
    [findNamespaces.rejected]: (state, action) => {
      state.error = action.payload
    },
    [updateNamespaces.fulfilled]: (state, action) => {
      state.loading = false
    },
    [updateNamespaces.pending]: (state, action) => {
      state.loading = true
    },
    [updateNamespaces.rejected]: (state, action) => {
      state.error = action.payload
    },
    [createNamespaces.fulfilled]: (state, action) => {
      state.loading = false
    },
    [createNamespaces.pending]: (state, action) => {
      state.loading = true
    },
    [createNamespaces.rejected]: (state, action) => {
      state.error = action.payload
    },
    // [exportOneNamespace.fulfilled]: (state, action) => {
    //   state.loading = false
    // },
    // [exportOneNamespace.pending]: (state, action) => {
    //   state.loading = true
    // },
    // [exportOneNamespace.rejected]: (state, action) => {
    //   state.error = action.payload
    // }
  }
})

export const {
  setPageSize
} = namespaceSlice.actions

export default namespaceSlice.reducer