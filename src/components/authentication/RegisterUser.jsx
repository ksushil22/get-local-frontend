import React from 'react';
import {Button, Form, Input} from "antd";
import {useRegisterMutation} from "../../redux/services/authAPI";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../redux/slicers/authSlicer";
import {useNavigate} from "react-router-dom";

export default function ({
                             setCurrentState,
                         }) {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const rules = [{
        required: true,
        message: 'The field is required.'
    }]

    const [
        registerUser,
        {isLoading: isRegisteringUser}
    ] = useRegisterMutation()

    function onFinish() {
        if (form.getFieldValue('password') !== form.getFieldValue('confirmPassword')) {
            form.setFields([
                {
                    name: "confirmPassword",
                    errors: ["Passwords do not match"]
                },
                {
                    name: "password",
                    errors: ["Passwords do not match"]
                }
            ]);
            return ;
        }

        registerUser(form.getFieldsValue()).then(({data, error})=> {
            if (data) {
                dispatch(setCredentials({...data.data, username: form.getFieldValue('email')}))
                setCurrentState(1)
            } else {
                console.error(error)
            }
        })


    }

    return (
        <div style={registerUserStyles.container}>
            <h1 style={{
                fontWeight: '900',
                fontSize: '50px',
                textShadow: '0 2px 5px'
            }}>Welcome!!</h1>
            <p style={{
                fontSize: 'x-large',
            }}>We need a few details to get started.</p>
            <Form
                form={form}
                layout={"vertical"}
                onFinish={onFinish}
            >
                <Form.Item
                    name={'name'}
                >
                    <Input placeholder={'Full name'} style={registerUserStyles.input}/>

                </Form.Item>
                <Form.Item
                    name={'email'} rules={[
                    {
                        required: true,
                        message: 'The field is required.'
                    },
                    {
                        type: "email",
                        message: "Invalid email address format."
                    }
                ]}>
                    <Input placeholder={'Email'} style={registerUserStyles.input}/>
                </Form.Item>
                <Form.Item name={'password'} rules={rules}>
                    <Input.Password
                        visibilityToggle={false}
                        placeholder={'Password'} style={registerUserStyles.input}/>
                </Form.Item>
                <Form.Item name={'confirmPassword'} rules={rules}>
                    <Input
                        placeholder={'Confirm Password'} style={registerUserStyles.input}/>
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{
                            ...registerUserStyles.buttons,
                            color: '#ece7e2',
                            textShadow: '0 1px 3px'
                        }}
                        loading={isRegisteringUser}
                        htmlType={'submit'}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}

const registerUserStyles = {
    container: {
        color: '#f2f2f2',
        padding: '10px'
    },
    input: {
        height: '58px',
        color: '#ece7e2',
        maxWidth: '450px',
        fontWeight: 500,
        fontSize: '16px',
        border: 'none',
        boxShadow: 'none',
        background: 'none'

    },
    buttons: {
        width: '240px',
        height: '50px',
        borderRadius: '10px',
        fontWeight: 'bolder',
        fontSize: '25px',
        background: 'none',
        border: 'none',
        boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'

    }
}
