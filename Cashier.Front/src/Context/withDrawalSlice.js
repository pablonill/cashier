import { createSlice } from '@reduxjs/toolkit';
import { CashierApi } from '../Api/CashierApi';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  message: null,
  data: null,
}

export const withDrawalSlice = createSlice({
  name: 'withdrawal',
  initialState: {
    values: INITIAL_STATE
  },
  reducers: {
    setWithDrawal: (state, action) => {
      state.values = action.payload;
    },
    resetWithDrawal: (state) => {
      state.values = INITIAL_STATE;
    },
    setWithDrawalError: (state, action) => {
      state.values.isError = action.payload.isError;
      state.values.message = action.payload.message;
    },
    setWithDrawalLoading: (state, action) => {
      state.values.isLoading = action.payload;
    } 
  },
})

// Thunks

export const withDrawalAsync = (amount) => {
  return async (dispatch) => {
    try {
      dispatch(setWithDrawalLoading(true));
      const body = {
        Amount: amount
      }
      const { data } = await CashierApi.post('/api/operation/withdrawal/', body);
      dispatch(setWithDrawal(data));
      dispatch(setWithDrawalLoading(false));
    } catch (error) {
      const data = error.response.data;
      dispatch(setWithDrawalError(data));
      dispatch(setWithDrawalLoading(false));
    }
  }
}

export const { setWithDrawal, resetWithDrawal, setWithDrawalError, setWithDrawalLoading } = withDrawalSlice.actions;
export default withDrawalSlice.reducer;