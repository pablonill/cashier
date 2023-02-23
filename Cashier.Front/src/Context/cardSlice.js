import { createSlice } from '@reduxjs/toolkit';
import { CashierApi } from '../Api/CashierApi';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  message: null,
  data: null,
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
    },
    setCardLoading: (state, action) => {
      state.values.isLoading = action.payload;
    }
  },
})

// Thunks

export const validateCardAsync = (cardNumber) => {
  return async (dispatch) => {
    try {
      dispatch(setCardLoading(true));
      const { data } = await CashierApi.get('/api/card/' + cardNumber + '/validate');
      dispatch(setCardState(data));
      dispatch(setCardLoading(false));
    } catch (error) {
      const data = error.response.data;
      dispatch(setCardError(data));
      dispatch(setCardLoading(false));
    }
  }
}

export const { setCardState, resetCardState, setCardError, setCardLoading } = cardSlice.actions;
export default cardSlice.reducer