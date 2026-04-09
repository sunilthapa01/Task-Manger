import { configureStore } from "@reduxjs/toolkit";
import  taskReducer from '../slice/taskSlice'
import themeReducer from '../slice/themeSlice'

export const store = configureStore({
    reducer: {
        taskStore:taskReducer,
        themeStore: themeReducer

    }
})