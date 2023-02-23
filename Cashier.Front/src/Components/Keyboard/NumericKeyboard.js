import React, { useState } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";

export const NumericKeyboard = ({ mask, separator,  onEnter }) => {
  const box = { width: '100%' }
  const [values, setValues] = useState(mask);

  const handleKeyPress = (key) => {
    let maskArray = values.split('');
    const next = maskArray.indexOf('#');

    if (next !== -1) { maskArray[next] = key; }

    setValues(maskArray.join(''));
  };

  const handleOnEnter = () => {
    const number = values.replaceAll(separator, '');

    onEnter(number);
  }

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <input readOnly style={box} value={values}></input>
        </div>
      </div>
      <br></br>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleKeyPress('1')}>
            1
          </Button>
          <Button variant="light" onClick={() => handleKeyPress('2')}>
            2
          </Button>
          <Button variant="light" onClick={() => handleKeyPress('3')}>
            3
          </Button>
        </ButtonGroup>
      </div>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleKeyPress('4')}>
            4
          </Button>
          <Button variant="light" onClick={() => handleKeyPress('5')}>
            5
          </Button>
          <Button variant="light" onClick={() => handleKeyPress('6')}>
            6
          </Button>
        </ButtonGroup>
      </div>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleKeyPress('7')}>
              7
            </Button>
            <Button variant="light" onClick={() => handleKeyPress('8')}>
              8
            </Button>
            <Button variant="light" onClick={() => handleKeyPress('9')}>
              9
            </Button>
        </ButtonGroup>
      </div>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => handleKeyPress('0')}>
              0
          </Button>
        </ButtonGroup>
      </div>
      <div className='row'>
        <ButtonGroup>
          <Button variant="light" onClick={() => setValues(mask)}>
            Clear
          </Button>
          <Button variant="light" onClick={() => handleOnEnter(0)}>
            Enter
          </Button>         
        </ButtonGroup>
      </div>
    </div>  
  )
}
