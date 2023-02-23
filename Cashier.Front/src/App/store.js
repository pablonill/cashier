import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Context/authSlice';
import cardReducer from '../Context/cardSlice';
import balanceReducer from '../Context/balanceSlice';
import withDrawalReducer from '../Context/withDrawalSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    card: cardReducer,
    balance: balanceReducer,
    withdrawal: withDrawalReducer,
  }
})