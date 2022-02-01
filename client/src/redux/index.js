import {configureStore, combineReducers} from "@reduxjs/toolkit";
import app from "./app.slice";
import auth from "./auth.slice";
import user from "./user.slice";
import namespace from "./namespace.slice";
import language from "./language.slice";
import translations from "./translations.slice";
import users from "./users.slice";

const rootReducer = combineReducers({
    app,
    auth,
    users,
    namespace,
    language,
    translations,
    user,
})

export const store = configureStore({reducer: rootReducer})

window.store = store;

export default store;