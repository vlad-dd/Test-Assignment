import React from 'react'
import { Formik, Form } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';

const FormAdd = ({setNewAddedValue}) => {
    const validate = Yup.object({
        firstName: Yup.string().max(15, 'Must be 15 characters or less!').required('Required'),
        lastName: Yup.string().max(15, 'Must be 15 characters or less!').required('Required'),
        email: Yup.string().email('email is invalid!').required('Email is required!'),
        phone: Yup.string().max(15, 'Must be 10 characters!').required('Required'),
    })
    return (
        <Formik initialValues = {
            {
                id: Math.floor(Math.random() * 100),
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            }}
            validationSchema={validate}
            onSubmit={values => {
                setNewAddedValue(values)
            }}>
                
                {formik => (
                  <div>
                     <h1 className='my-4 font-weight-bold-display-4'>New Person</h1>
                    <Form>
                        <TextField label = 'First Name' name='firstName' type='text'/>
                        <TextField label = 'Last Name' name='lastName' type='text'/>
                        <TextField label = 'Email' name='email' type='text'/>
                        <TextField label = 'Phone' name='phone' type='text'/>
                        <button className='btn btn-dark mt-3' type='submit'>Add your data</button>
                    </Form>
                  </div>
                
                 
                )}
              </Formik>
    )
}

export default FormAdd
