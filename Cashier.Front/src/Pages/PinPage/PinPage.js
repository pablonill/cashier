import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NumericKeyboard } from '../../Components/Keyboard/NumericKeyboard';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { resetCardState } from '../../Context/cardSlice';
import { loginAsync, resetAuthState } from '../../Context/authSlice';

export const PinPage = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth.values);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [pinNumber, setPinNumber] = useState('');

  const handleOnEnter = (number) => {
    setPinNumber(number);
    dispatch(loginAsync(state.cardNumber, number));
  }

  useEffect(() => {
    if (!authState.isLoading && !authState.isError && authState.data) {
      navigate('/operations');
    }

    if (!authState.isLoading && authState.isError) {
      navigate('/error', { state: { message: authState.message, resetCallback: resetAuthState() } });
    }
  });

  const handleOnExit = () => {
    dispatch(resetAuthState());
    dispatch(resetCardState());
    navigate('/');
  }

  return (
    <>
      <h3>Please input your pin number</h3>
      <NumericKeyboard mask={'####'} separator={'-'} onEnter={handleOnEnter}></NumericKeyboard>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={handleOnExit}>
            Exit
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}