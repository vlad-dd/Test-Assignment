import React, { useState } from 'react';
import FormAdd from './Form';

const InputForm = ({setNewAddedValue, className}) => {
    
    return (
        <div className={className}>
        <div className='container mt-3'>
          <div className='row'>
            <div className='col-md-5'>
            <FormAdd setNewAddedValue = {setNewAddedValue}/>
            </div>
          </div>

        </div>
        </div>
    )
}

export default InputForm
