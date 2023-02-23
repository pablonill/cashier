import { createSlice } from '@reduxjs/toolkit';
import { CashierApi } from '../Api/CashierApi';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  message: null,
  data: null,
}

export const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    values: INITIAL_STATE
  },
  reducers: {
    setBalance: (state, action) => {
      state.values = action.payload;
    },
    resetBalance: (state) => {
      state.values = INITIAL_STATE;
    },
    setBalanceError: (state, action) => {
      state.values.isError = action.payload.isError;
      state.values.message = action.payload.message;
    },
    setBalanceLoading: (state, action) => {
      state.values.isLoading = action.payload;
    } 
  },
})

// Thunks

export const fetchBalanceAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(setBalanceLoading(true));
      const { data } = await CashierApi.get('/api/operation/balance/');
      dispatch(setBalance(data));
      dispatch(setBalanceLoading(false));
    } catch (error) {
      const data = error.response.data;
      dispatch(setBalanceError(data));
      dispatch(setBalanceLoading(false));
    }
  }
}

export const { setBalance, resetBalance, setBalanceError, setBalanceLoading } = balanceSlice.actions;
export default balanceSlice.reducer;