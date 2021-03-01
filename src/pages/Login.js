import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

//import Hooks
import { useForm } from '../utils/hooks'

import '../App.css'

function Login(props) {

    const context  = useContext(AuthContext);
    
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm( loginCallback, {
        email:'',
        password:''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER,{
        update(_, { data: { login: userData }}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    })

    function loginCallback(){
        loginUser();
    }

    
    return (
        <div className="form-container">
            <Form onSubmit = {onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h3>Login</h3>
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
                <Button type="submit" primary>
                    Login
                </Button>
                <p>Forgot password? Click Here</p>
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
const LOGIN_USER = gql`
mutation login(
    $email:String!
    $password:String!
){
    login(
        loginInput: {
            email: $email
            password: $password
        }
    ){
      id userName email token createdAt  
    }
}
`

export default Login;
