import { createSlice } from "@reduxjs/toolkit";

const initialState: { messages: any } = {
    messages: [],
 };

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        getMessagesRedux: (state, { payload }) => {
           state.messages.push(...payload);
        },
  
        addMessagesRedux: (state, { payload }) => {
           state.messages = [payload, ...state.messages];
        },
  
        removeMessagesRedux: (state) => {
           state.messages = [];
        },
     },
})

export default messageSlice.reducer;
export const { getMessagesRedux, addMessagesRedux, removeMessagesRedux } = messageSlice.actions;
