import React from "react";
import {Form, TimePicker} from "antd";

const TimingsForm = ({form, callback}) => {

    return <Form
        form={form}
        onFinish={callback}
        layout={"vertical"}>
        <Form.Item
            label={"Monday:"}
            name={"monday"}>
            <TimePicker /> -> <TimePicker />
        </Form.Item>
    </Form>
}
const Timings = () => {

    const [form] = Form.useForm();

    function callback () {
        console.log(form.getFieldsValue());
    }

    return (<div style={{
        marginTop: 20
    }}>
        <p style={{fontSize: '20px'}}>Business Timings</p>
        <TimingsForm form={form} callback={callback}/>


    </div>)
}

export default Timings;
