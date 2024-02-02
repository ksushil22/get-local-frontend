import React from 'react';
import {Button, Form, Input, Select} from "antd";

export default function () {
    const [form] = Form.useForm();
    const rules = [{
        required: true,
        message: 'The field is required.'
    }]
    function onFinish() {
        console.log(form.getFieldsValue())
    }

    return <Form
        form={form}
        layout={"vertical"}
        onFinish={onFinish}
    >
        <p style={{
            color: '#f2f2f2',
            fontSize: 'x-large',
        }}>Tell us more about the business...</p>
        <Form.Item
            name={'name'}
            rules={rules}
        >
            <div className={'hover-input'}>
                <Input placeholder={'Business Name'}/>
            </div>
        </Form.Item>
        <Form.Item
            name={'Business Type'}
            rules={rules}
        >
            <div className={'hover-input'}>
                <Select
                    options={{}}
                    placeholder={'Business Type'}
                    style={registerBusinessStyles.input}
                />
            </div>
        </Form.Item>
        <Form.Item
            name={'street'}
            rules={rules}
        >
            <div className={'hover-input'}>
                <Input placeholder={'Street Address'}/>
            </div>
        </Form.Item>
        <Form.Item
            name={'city'}
            rules={rules}
        >
            <div className={'hover-input'}>
                <Input placeholder={'City'}/>
            </div>
        </Form.Item>
        <Form.Item
            name={'province'}
            rules={rules}
        >
            <div className={'hover-input'}>
                <Input placeholder={'State/Province'}/>
            </div>
        </Form.Item>
        <Form.Item>
            <Button
                style={{
                    ...registerBusinessStyles.buttons,
                    color: '#ece7e2',
                    textShadow: '0 1px 3px'
                }}
                htmlType={'submit'}
            >
                Submit
            </Button>
        </Form.Item>

    </Form>

}

const registerBusinessStyles = {
    input: {
        height: '58px',
        color: '#ece7e2',
        maxWidth: '450px',
        fontWeight: 500,
        fontSize: '16px',
        background: 'none',
        border: 'none',

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
