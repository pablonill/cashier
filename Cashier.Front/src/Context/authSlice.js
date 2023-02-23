import { createSlice } from '@reduxjs/toolkit';
import { CashierApi } from '../Api/CashierApi';

const INITIAL_STATE = {
  isError: false,
  message: "",
  data: {
    cardNumber: "",
    token: null,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: { values: INITIAL_STATE },
  reducers: {
    setAuth: (state, action) => {
      state.values = action.payload;
    },
    setCardError: (state, action) => {
      state.values.isError = action.payload.isError;
      state.values.message = action.payload.message;
    },
    resetAuthState: (state) => {
      state.values = INITIAL_STATE;
      CashierApi.defaults.headers.common['Authorization'] = '';
    },
  },
})

export const loginAsync = (cardNumber, pinNumber) => {
  return async (dispatch) => {
    try {
      const body = {
        CardNumber: cardNumber,
        PinNumber: pinNumber,
      }
  
      const response = await CashierApi.post('/auth', body);
      const { data } = response;
      CashierApi.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      dispatch(setAuth(data));
    } catch (error) {
      const data = error.response.data;
      dispatch(setCardError(data));
    }
  }
}

export const { setAuth, resetAuthState, setCardError } = authSlice.actions;
export default authSlice.reducer;