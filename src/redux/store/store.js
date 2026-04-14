import { configureStore } from "@reduxjs/toolkit";
import  taskReducer from '../slice/taskSlice'
import themeReducer from '../slice/themeSlice'
import loginReducer from '../slice/loginSlice'

export const store = configureStore({
    reducer: {
        taskStore:taskReducer,
        themeStore: themeReducer,
        loginUser: loginReducer

    }
})