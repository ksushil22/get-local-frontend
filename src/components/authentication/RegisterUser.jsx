import React from 'react';
import {Button, Form, Input} from "antd";
import {useRegisterMutation} from "../../redux/services/authAPI";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../redux/slicers/authSlicer";
import {useNavigate} from "react-router-dom";
import "./authentication.css";

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
                console.log(data)
                dispatch(setCredentials({...data, username: form.getFieldValue('email')}))
                setCurrentState(1)
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
                    rules={rules}
                >
                    <div className={'hover-input'}>
                        <Input placeholder={'Full name'} />
                    </div>

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
                    <div className={'hover-input'}>
                        <Input placeholder={'Email'}/>
                    </div>
                </Form.Item>
                <Form.Item name={'password'} rules={rules}>
                    <div className={'hover-input'}>
                        <Input.Password
                            visibilityToggle={false}
                            placeholder={'Password'} />
                    </div>
                </Form.Item>
                <Form.Item name={'confirmPassword'} rules={rules}>
                    <div className={'hover-input'}>
                        <Input
                            placeholder={'Confirm Password'} />
                    </div>
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <p style={{cursor: 'pointer'}} onClick={()=> navigate('/authenticate')}>Already registered? Click here to LogIn</p>
        </div>
    )

}

const registerUserStyles = {
    container: {
        color: '#ece7e2',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px'
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
