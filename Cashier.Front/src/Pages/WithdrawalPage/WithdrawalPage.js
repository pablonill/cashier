import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericKeyboard } from '../../Components/Keyboard/NumericKeyboard';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withDrawalAsync } from '../../Context/withDrawalSlice';

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

  useEffect(() => {
    if (withDrawalState && !withDrawalState.isLoading && !withDrawalState.isError && withDrawalState.data) {
      navigate('/report', { state: { withDrawalState, amount } } );
    }
  }, [withDrawalState, navigate, amount]);

  return (
    <>
      <h3>Please enter the amount to withdrawal</h3>
      <NumericKeyboard mask={'###.###.###'} separator={'.'} onEnter={handleOnEnter}></NumericKeyboard>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => navigate('/')}>
            Exit
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}