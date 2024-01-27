import React, {useContext} from "react";
import {Button, Form, Input} from "antd";
import {useLoginMutation} from "../../redux/services/authAPI";
import {setCredentials} from "../../redux/slicers/authSlicer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


export default function () {
    const [loginMutation, {isLoading: isLoggingInUser}] = useLoginMutation()
    const dispatch = useDispatch();

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const onFinish = async () => {
        try {
            const userData = await loginMutation(form.getFieldsValue()).unwrap();

            console.log(form.getFieldValue("email"));
            console.log(userData)


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
        <Form
            form={form}
            onFinish={onFinish}
            layout={'vertical'}
        >
            <Form.Item label={'Email'} name={'email'} rules={[
                {
                    required: true,
                    message: 'The field is required.'
                },
                {
                    type: "email",
                    message: "Invalid email address format."
                }
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item label={'Password'} name={'password'} rules={rules}>
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType={'submit'}
                >
                    Submit</Button>
            </Form.Item>
        </Form>
    )

}
