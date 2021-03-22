import { createStore } from "redux";
import { rootReducer } from "../ReducersFolder/index";
import { devToolsEnhancer } from "redux-devtools-extension";

export const store = createStore(rootReducer, devToolsEnhancer());
