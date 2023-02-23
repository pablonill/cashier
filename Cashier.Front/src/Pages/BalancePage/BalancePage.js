import React from 'react';
import { Alert } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCardState } from '../../Context/cardSlice';
import { resetBalance } from '../../Context/balanceSlice';

export const BalancePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
 
  const handleOnBack = () => {
    dispatch(resetBalance());
    navigate(-1);
  }

  const handleOnExit = () => {
    dispatch(resetCardState());
    navigate('/');
  }

  return (
    <>
      <h3>Balance</h3>
      <div className='row'>
        <Alert variant='info'>{`Card Number: ${state.cardNumber}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='primary'>{`Expiration Date: ${state.expirationDate}`}</Alert>
      </div>
      <div className='row'>
        <Alert variant='success'>{`Balance: $ ${state.balance}`}</Alert>
      </div>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleOnBack()}>
            Back
          </Button>
          <Button variant="danger" onClick={() => handleOnExit()}>
            Exit
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
