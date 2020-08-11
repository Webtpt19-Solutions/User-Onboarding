import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';

const Form = ({addUser}) => {
    const [ newUser, setNewUser ] = useState({
        name: '',
        email: '',
        password: '',
        ToS: false
    });

    const [ disabled, setDisabled ] = useState(true);

    const [ errors, setErrors ] = useState({
        name: '',
        email: '',
        password: '',
        ToS: ''
    });

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .required('Must include user name'),
        email: Yup
            .string()
            .email('Must be a valid email address.')
            .required('Must include email address'),
        password: Yup
            .string()
            .min(8, "Passwords must be 8 characters long")
            .required("Password is required"),
        ToS: Yup
            .boolean()
            .oneOf([true], 'Must accept Terms and Conditions')
    });

    useEffect(() => {
        formSchema.isValid(newUser)
            .then(bool => {
                setDisabled(!bool)
            })
    }, [newUser]);

    const validateChange = (eTarget) => {
        console.log('validate event', eTarget)
        Yup
            .reach(formSchema, eTarget.name)
            .validate(eTarget.name === 'ToS' ? eTarget.checked : eTarget.value)
            .then(bool => {
                setErrors({
                    ...errors,
                    [eTarget.name]: ''
                })
            })
            .catch(err => {
                console.log('MADE IT HERE')
                setErrors({
                    ...errors,
                    [eTarget.name]: err.errors[0]
                })
            })
    };

    const handleChange = (e) => {
        console.log('handlechange event', e)
        const newData = {
            ...newUser,
            [e.target.name]:  e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e.target)
        setNewUser(newData)

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted baby')
        Axios.post('https://reqres.in/api/users', newUser)
            .then(res => {
                console.log(res)
                addUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    

    return (
        <MemberForm onSubmit={handleSubmit}>
            <label>Name</label>
            <input type='text' name='name' value={newUser.name} onChange={handleChange}/>
            {errors.name.length > 0 ? <p style={{color:'red'}}>{errors.name}</p> : null}

            <label>Email</label>
            <input type='email' name='email' value={newUser.email} onChange={handleChange}/>
            {errors.email.length > 0 ? <p style={{color:'red'}}>{errors.email}</p> : null}

            <label>Password</label>
            <input type='password' name='password' value={newUser.password} onChange={handleChange}/>
            {errors.password.length > 0 ? <p style={{color:'red'}}>{errors.password}</p> : null}

            <label>Terms of Service</label>
            <input type='checkbox' name='ToS' onChange={handleChange} checked={newUser.ToS}/>
            {errors.ToS.length > 0 ? <p style={{color:'red'}}>{errors.ToS}</p> : null}

            <button type='submit' disabled={disabled}>Submit!</button>
        </MemberForm>
    )
};

export default Form;

const MemberForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 25%;
    margin: 0 auto;
    border: 1px solid black;
    padding: 25px;
    input{
        width: 100%;
        margin: 10px 0;
    }
    button{
        margin: 5px auto;
    }
`;