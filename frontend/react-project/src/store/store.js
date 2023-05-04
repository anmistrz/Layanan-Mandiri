import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlices";
import renewReducer from "../features/renewSlices";
import issueReducer from "../features/issueSlices";
import suggestReducer from "../features/suggestSlices";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        renew: renewReducer,
        issue: issueReducer,
        suggest: suggestReducer,
    }
});

