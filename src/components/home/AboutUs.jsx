import React, {useEffect, useState} from "react";
import {Form, Input} from "antd";
import "./home.css";
import CustomSpinner, {DISPLAY_TYPES_ENUM, SPINNERS} from "../util/customSpinner/CustomSpinner";
import {useUpdateAboutUsMutation} from "../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import CustomPopover from "../util/CustomPopover";

export default function ({aboutUs, isLoading=true}) {
    const [data, setData] = useState("");
    const [buttonVisible, setButtonVisible] = useState(false);
    const [form] = Form.useForm();
    const [updateBusiness, {isLoading: isRegisteringBusiness}] = useUpdateAboutUsMutation();
    const businessId = useSelector((state)=> state.business.businessId)
    useEffect(() => {
        setData(aboutUs);
        form.setFieldValue('textarea', aboutUs);
    }, [aboutUs, form]);
    

    if (isLoading)
        return <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY_TYPES_ENUM.AREA}/>


    const handleUpdate = () => {
        const newData = document.getElementById("textarea").value;
        updateBusiness({
            aboutUs: newData,
            id: businessId
        }).then(({data, error})=>{
            if (data) {
                setData(newData);
                setButtonVisible(false);
            } else {
                console.error(error);
            }
        })
    };

    const handleTextAreaFocus = () => {
        setButtonVisible(true);
    };

    const handleCancel = () => {
        form.setFieldValue('textarea', data)
        setButtonVisible(false);
    };

    return (
        <div style={{width: "100%"}}>
            <p style={AboutUsStyle.headings}>About the business <CustomPopover content={"We believe there is a story behind every business. Let people know about your passion."}/></p>
            <div style={{marginTop: 15}}>
                <Form
                    className={"about-us-form"}
                    form={form}
                    onFinish={handleUpdate}>
                    <Form.Item name={'textarea'}>
                        <Input.TextArea
                            style={{
                                width: "100% !important",
                                minHeight: "300px",
                            }}
                            onFocus={handleTextAreaFocus}
                        ></Input.TextArea>
                    </Form.Item>
                    <div
                        style={{
                            transition: "margin-top 0.5s",
                            marginTop: buttonVisible ? "0px" : "-55px",
                        }}
                    >
                        <button
                            type={"button"}
                            style={AboutUsStyle.button}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type={"button"}
                            style={{...AboutUsStyle.button, float: "right"}}
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

const AboutUsStyle = {
    button: {
        cursor: 'pointer',
        minWidth: 150,
        minHeight: 30,
        fontWeight: 'bold',
        background: 'var(--primary-color)',
        border: '1 solid var(--primary-background)',
        transition: 'color 0.5s, transform 0.2s',
        color: 'var(--primary-background)',
        boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)',
        borderRadius: 3
    },
    headings: {
        fontSize: '20px'
    }
}
