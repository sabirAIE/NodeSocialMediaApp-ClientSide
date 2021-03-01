import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { Button, Checkbox, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

//import Hooks
import { useForm } from '../utils/hooks'

import '../App.css'

function Register(props) {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm( registerUser, {
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER,{
        update(_, { data: { register: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    })

    function registerUser(){
        addUser();
    }

    
    return (
        <div className="form-container">
            <Form onSubmit = {onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h3>Register</h3>
                <Form.Input
                    label="User Name"
                    placeholder="Your User Name"
                    type="text"
                    error={errors.userName ? true : false}
                    name="userName"
                    value={values.userName}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    type="text"
                    placeholder="Your Email"
                    name="email"
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Password Again"
                    type="password"
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
                <p>Allready have an account? Login</p>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value =>(
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
const REGISTER_USER = gql`
mutation register(
    $userName:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
){
    register(
        registerInput: {
            userName:$userName
            email:$email
            password:$password
            confirmPassword:$confirmPassword
        }
    ){
      id userName email token createdAt  
    }
}
`

export default Register;
