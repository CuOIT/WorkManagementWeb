import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducer/userReducer";
import nameProjectReducer from "../reducer/nameProjectReducer";
import sortToReducer from "../reducer/sortTo"
import renderSidebarReducer from "../reducer/renderSidebar"
import nameWorkspaceReducer from "../reducer/nameWorkspaceReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    storage,
};
const reducers = combineReducers({ user: userReducer, nameProject: nameProjectReducer, sortTo:sortToReducer,renderSidebar:renderSidebarReducer,nameWorkspace:nameWorkspaceReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    
});
// const store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
