import React from "react";
import {Button, Col, Form, Image, Input, Row} from "antd";
import {useLoginMutation} from "../../redux/services/authAPI";
import {setCredentials} from "../../redux/slicers/authSlicer";
import {useDispatch} from "react-redux";
import { useNavigate} from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import "./authentication.css";


export default function () {
    const [loginMutation, {isLoading: isLoggingInUser}] = useLoginMutation()
    const dispatch = useDispatch();

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const screens = useBreakpoint();

    const innerDivHeight = screens.md || screens.lg || screens.xl || screens.xxl ? '100vh' : '100%';
    const reactivePadding = screens.md || screens.lg || screens.xl || screens.xxl ? '15%' : '5%';

    const onFinish = async () => {
        try {
            const userData = await loginMutation(form.getFieldsValue()).unwrap();
            dispatch(setCredentials({...userData, username: form.getFieldValue("email")}));
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const rules = [{
        required: true,
        message: 'The field is required.'
    }]

    return (
        <Row style={loginStyle.mainContainer}>
            <Col xl={16} md={16} sm={24} xs={24}
                 style={{...loginStyle.innerDivs, backgroundColor: 'var(--primary-color)', color: '#ece7e2', minHeight: innerDivHeight}}
            >
                <Image
                    style={{
                        maxHeight: '120px'
                    }}
                    preview={false} src={require('../../assets/img/GetLocals-logos/GetLocals-logos_transparent.png')} />
                <h1 style={{
                    fontWeight: '900',
                    fontSize: '50px',
                    textShadow: '0 2px 5px'
                }}>Sign In to your Account</h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout={'vertical'}
                >
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
                        <Input placeholder={'Email'} style={loginStyle.input}/>
                    </Form.Item>
                    <Form.Item name={'password'} rules={rules}>
                        <Input.Password
                            placeholder={'Password'} style={loginStyle.input}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{
                                ...loginStyle.buttons,
                                color: '#ece7e2',
                                textShadow: '0 1px 3px'
                        }}
                            htmlType={'submit'}
                            loading={isLoggingInUser}
                        >
                            Submit</Button>
                    </Form.Item>
                </Form>

            </Col>
            <Col xl={8} md={8} sm={24} xs={24}
                 style={{...loginStyle.innerDivs, color: 'var(--primary-color)', minHeight: innerDivHeight, paddingTop: reactivePadding}}
            >
                <h1 style={{
                    fontWeight: '900',
                    fontSize: '50px',
                    color: 'var(--primary-color)',
                    textShadow: '0 2px 5px'
                }}>New Here?</h1>
                <p style={{
                    fontWeight: 'bold',
                    fontSize: 'larger',
                    color: 'var(--primary-color)'
                }}>You are just one step away...</p>
                <Button
                    style={{...loginStyle.buttons,
                        color:'var(--primary-color)', marginTop: '20px',
                        textShadow: '0 1px 3px'
                }}
                    onClick={() => navigate('/authenticate/registration')}>
                    Register
                </Button>

            </Col>

        </Row>
    )

}

const loginStyle = {
    mainContainer : {
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    innerDivs: {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '5%',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '10%'
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
