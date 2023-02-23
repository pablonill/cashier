import React, { useEffect } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalanceAsync } from '../../Context/balanceSlice';
import { resetCardState } from '../../Context/cardSlice';
import { resetAuthState } from '../../Context/authSlice';
import { resetBalance } from '../../Context/balanceSlice';

export const OperationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balanceState = useSelector(state => state.balance.values);

  const handleGetBalance = () => {
    dispatch(fetchBalanceAsync());
  }

  const handleOnExit = () => {
    dispatch(resetAuthState());
    dispatch(resetCardState());
    navigate('/');
  }
  
  useEffect(() => {
    if (!balanceState.isLoading && !balanceState.isError && balanceState.data) {
      navigate('/balance', { state: balanceState.data });
    }

    if (!balanceState.isLoading && balanceState.isError) {
      navigate('error', { state: { message: balanceState.message, resetCallback: resetBalance() } });
    }
  }, [balanceState, navigate]);

  return (
    <>
      <h3>Please select an operation</h3>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleGetBalance()}>
            Get Balance
          </Button>
          <Button variant="light" onClick={() => navigate('/withdrawal')}>
            Withdrawal
          </Button>          
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleOnExit()}>
            Exit
          </Button>       
        </ButtonGroup>        
      </div>
    </>
  )
}
