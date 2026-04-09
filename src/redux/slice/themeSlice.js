import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    themeValue:''
}


const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers: {
        addTheme: (state, actions)=> {
               switch(mode.id){
      case 'light':
        dispatch(addTheme('light'))  
      case 'dark':
        dispatch(addTheme('Dark'))
      case 'system':
        dispatch(addTheme('system'))

    }
            state.themeValue = actions.payload
        }
    }
})

export const {addTheme} = themeSlice.actions
export default themeSlice.reducer