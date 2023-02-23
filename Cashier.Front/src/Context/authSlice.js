import { createSlice } from '@reduxjs/toolkit';
import { CashierApi } from '../Api/CashierApi';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  message: "",
  data: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: { values: INITIAL_STATE },
  reducers: {
    setAuth: (state, action) => {
      state.values = action.payload;
    },
    setAuthError: (state, action) => {
      state.values.isError = action.payload.isError;
      state.values.message = action.payload.message;
    },
    resetAuthState: (state) => {
      state.values = INITIAL_STATE;
      CashierApi.defaults.headers.common['Authorization'] = '';
    },
    setAuthLoading: (state, action) => {
      state.values.isLoading = action.payload;
    }
  },
})

export const loginAsync = (cardNumber, pinNumber) => {
  return async (dispatch) => {
    try {
      const body = {
        CardNumber: cardNumber,
        PinNumber: pinNumber,
      }
  
      dispatch(setAuthLoading(true));
      const response = await CashierApi.post('/auth', body);
      const { data } = response;
      CashierApi.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      dispatch(setAuth(data));
      dispatch(setAuthLoading(false));
    } catch (error) {
      const data = error.response.data;
      dispatch(setAuthError(data));
      dispatch(setAuthLoading(false));
    }
  }
}

export const { setAuth, resetAuthState, setAuthError, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;