import React from 'react';
import { Alert } from 'react-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const ErrorPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBackNavigate = () => {
    dispatch(state.resetCallback);

    navigate(-1);
  }

  return (
    <>
      <div className='row'>
        <Alert variant='danger'>{state.message}</Alert>
      </div> 
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={handleBackNavigate}>
            Back
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
