import React from 'react';
import { Alert } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetBalance } from '../../Context/balanceSlice';
import { resetAuthState } from '../../Context/authSlice';
import { resetCardState } from '../../Context/cardSlice';

export const ReportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleOnBack = () => {
    dispatch(state.resetCallback);
    navigate(-1);
  }

  const handleOnExit = () => {
    dispatch(resetAuthState());
    dispatch(resetCardState());    
    dispatch(resetBalance());
    dispatch(state.resetCallback);
    navigate('/');
  }

  return (
    <>
      <h3>Operation Report</h3>
      <div className='row'>
        <Alert variant='info'>{`Operation Number: ${state.data.operationNumber}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='primary'>{`Date: ${Date()}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='danger'>{`Withdrawl Amount: $ ${state.amount}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='success'>{`Balance: $ ${state.data.newBalance}` }</Alert>
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
