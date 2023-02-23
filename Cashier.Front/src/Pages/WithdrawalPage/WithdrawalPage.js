import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericKeyboard } from '../../Components/Keyboard/NumericKeyboard';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withDrawalAsync, resetWithDrawal } from '../../Context/withDrawalSlice';
import { resetBalance } from '../../Context/balanceSlice';
import { resetAuthState } from '../../Context/authSlice';
import { resetCardState } from '../../Context/cardSlice';

export const WithDrawalPage = () => {
  const dispatch = useDispatch();
  const withDrawalState = useSelector(state => state.withdrawal.values);
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  const handleOnEnter = (number) => {
    number = number.replaceAll('#', '');
    setAmount(number);
    dispatch(withDrawalAsync(number));
  }

  const handleOnExit = () => {
    dispatch(resetAuthState());
    dispatch(resetCardState());    
    dispatch(resetBalance());
    dispatch(resetWithDrawal());
    navigate('/');
  }

  useEffect(() => {
    if (!withDrawalState.isLoading && !withDrawalState.isError && withDrawalState.data) {
      navigate('/report', { state: { data: withDrawalState.data, amount: amount, resetCallback: resetWithDrawal() } } );
    }

    if (!withDrawalState.isLoading && withDrawalState.isError) {
      navigate('error', { state: { message: withDrawalState.message, resetCallback: resetWithDrawal() } });
    }
  }, [withDrawalState, navigate, amount]);

  return (
    <>
      <h3>Please enter the amount to withdrawal</h3>
      <NumericKeyboard mask={'###.###.###'} separator={'.'} onEnter={handleOnEnter}></NumericKeyboard>
      <div className='row'>
        <ButtonGroup>
          <Button variant="danger" onClick={() => handleOnExit()}>
            Exit
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}