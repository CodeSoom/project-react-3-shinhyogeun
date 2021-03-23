import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'application',
  initialState: {
    input: '',
  },
  reducers: {
    updateInput: (state, { payload: input }) => ({
      ...state,
      input,
    }),
  },
});

export const { updateInput } = actions;

export default reducer;
