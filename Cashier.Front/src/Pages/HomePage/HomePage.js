import React, { useEffect, useState } from 'react';
import { NumericKeyboard } from '../../Components/Keyboard/NumericKeyboard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateCardAsync } from '../../Context/cardSlice';

export const HomePage = () => {
  const navigate = useNavigate();
  const cardState = useSelector(state => state.card.values);
  const [cardNumber, setCardNumber] = useState('');
  const dispatch = useDispatch();

  const handleOnEnter = (number) => {
    dispatch(validateCardAsync(number));
    setCardNumber(number);
  }

  useEffect(() => {
    if (cardState && cardState.data?.cardNumber && !cardState.isError) {
      navigate('pin', { state: { cardNumber } } );
    }

    if (cardState && cardState.isError) {
      navigate('error', { state: { message: cardState.message } });
    }
  }, [cardState, navigate, cardNumber]);

  return (
    <>
      <h3>Please input your card number</h3>
      <NumericKeyboard mask={'####-####-####-####'} separator={'-'} onEnter={handleOnEnter}></NumericKeyboard>
    </>
  )
}
