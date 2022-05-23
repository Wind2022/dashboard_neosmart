const { createSlice } = require("@reduxjs/toolkit");


const messageSlice = createSlice({
    name: "messages",
    initialState: {
        message: {
            message: [],
            isFetching: false,
            failed: false,
            messageById: []
        }
    },
    reducers: {
        getMessageStart: (state) => {
            state.message.isFetching = true;
        },
        getMessageSuccess: (state, action) => {
            state.message.isFetching = false;
            state.message.message = action.payload;
            state.message.failed = false;
        },
        getMessageFailed: (state) => {
            state.message.failed = true;
        },
        getMessageByIdSuccess: (state, action) => {
            state.message.messageById = action.payload;
        }
    }
})

export const {
    getMessageStart,
    getMessageSuccess,
    getMessageFailed,
    getMessageByIdSuccess
} = messageSlice.actions

export default messageSlice.reducer;