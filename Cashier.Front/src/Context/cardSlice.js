import { createSlice } from '@reduxjs/toolkit';
import { CashierApi } from '../Api/CashierApi';

const INITIAL_STATE = {
  isError: false,
  message: null,
  data: {
    cardNumber: null,
    isLocked: false,
  },
}

export const cardSlice = createSlice({
  name: 'card',
  initialState: {
    values: INITIAL_STATE
  },
  reducers: {
    setCardState: (state, action) => {
      state.values = action.payload;
    },
    setCardError: (state, action) => {
      state.values.isError = action.payload.isError;
      state.values.message = action.payload.message;
    },
    resetCardState: (state) => {
      state.values = INITIAL_STATE;
    }
  },
})

// Thunks

export const validateCardAsync = (cardNumber) => {
  return async (dispatch) => {
    try {
      const { data } = await CashierApi.get('/api/card/' + cardNumber + '/validate');
      dispatch(setCardState(data));
    } catch (error) {
      const data = error.response.data;
      dispatch(setCardError(data));
    }
  }
}

export const { setCardState, resetCardState, setCardError } = cardSlice.actions;
export default cardSlice.reducer