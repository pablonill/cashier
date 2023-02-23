import React from 'react';
import { Alert } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

export const ReportPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);

  return (
    <>
      <h3>Operation Report</h3>
      <div className='row'>
        <Alert variant='info'>{`Operation Number: ${state.withDrawalState.data.operationNumber}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='primary'>{`Date: ${Date()}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='danger'>{`Withdrawl Amount: ${state.amount}` }</Alert>
      </div>
      <div className='row'>
        <Alert variant='success'>{`Balance: ${state.withDrawalState.data.newBalance}` }</Alert>
      </div>      
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="danger" onClick={() => navigate('/')}>
            Exit
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
