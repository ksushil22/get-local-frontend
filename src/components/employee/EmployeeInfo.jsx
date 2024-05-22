import React from "react";
import {Form, Row} from "antd";
import BusinessHeading from "../util/BusinessHeading";
import GetUpload from "../util/upload/GetUpload";


const EmployeeForm = () => {
    const [form] = Form.useForm();


    function submitEmployeeInfo() {

    }

    return (
        <Form
            form={form}
            onFinish={submitEmployeeInfo}
            layout={"vertical"}
        >
            <GetUpload />
        </Form>)

}
const EmployeeInfo = () => {

    return <Row>
        <BusinessHeading heading={"Employee Info"} />
        <div className={"employee-div"} style={{
            marginTop: 20
        }}>
            <EmployeeForm />
        </div>
    </Row>
}

export default EmployeeInfo;
