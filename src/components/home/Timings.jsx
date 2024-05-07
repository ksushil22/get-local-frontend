import React, {useEffect, useState} from "react";
import {Button, Form, Switch, TimePicker} from "antd";
import dayjs from "dayjs"
import {useGetBusinessTimingsQuery} from "../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import CustomSpinner, {DISPLAY_TYPES_ENUM, SPINNERS} from "../util/customSpinner/CustomSpinner";
import "./home.css"

const TimingsForm = () => {

    const businessId = useSelector(state => state.business.businessId)
    const [currentData, setCurrentData] = useState({
        'monday': null,
        'tuesday': null,
        'wednesday': null,
        'thursday': null,
        'friday': null,
        'saturday': null,
        'sunday': null
    })

    const defaultTimingString = "10:00 AM - 10:00 PM";

    const {
        data: businessTimings,
        isLoading: isLoadingBusinessTimings,
        refetch: refetchTimings
    } = useGetBusinessTimingsQuery({businessId}, {skip: businessId === null})
    const [form] = Form.useForm();

    useEffect(() => {
        if (businessTimings) {
            const data = {};
            for (const [key, value] of Object.entries(businessTimings)) {
                data[key] = value.split("-").map(timeString => dayjs(timeString, 'hh:mm A'))
            }
            setCurrentData(data)
        }
    }, [businessTimings])

    useEffect(() => {
        console.log(currentData)
    }, [currentData])

    useEffect(() => {
        if (businessId) {
            refetchTimings()
        }
    }, [businessId])


    function getFormattedTime(time) {
        let hours = time.hour();
        const minutes = time.minute();
        let ampm = hours < 12 ? "AM" : "PM";
        if (hours === 0) {
            ampm = "AM";
            hours = 12;
        }
        hours = hours > 12 ? hours % 12 : hours;
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    }

    const handleSubmitTime = () => {
        const dto = {};

        for (const [key, value] of Object.entries(currentData)) {
            if (value) {
                dto[key] = handleGetFormattedTime(value);
            } else {
                if (!key.includes("switch")) {
                    if (form.getFieldValue`${key}_switch`) {
                        form.setFields([{
                            name: key,
                            errors: ["Please select a time range"]
                        }]);
                    } else{
                        dto[key] = 'CLOSED'
                    }
                }
            }
        }

        console.log(dto);
    };

    const handleGetFormattedTime = (value) => {
        let from = "";
        let to = "";

        if (value && value.length === 2) {
            if (value[0] !== null) {
                from = getFormattedTime(value[0]);
            }
            if (value[1] !== null) {
                to = getFormattedTime(value[1]);
            }
        }
        return `${from} - ${to}`;
    };

    return (
        isLoadingBusinessTimings ?
            <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY_TYPES_ENUM.AREA}/> :
            (
                <Form
                    style={{ marginLeft: 20 }}
                    form={form}
                    onFinish={handleSubmitTime}
                >
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                        <div key={day} style={{ marginBottom: 10 }}>
                            <Form.Item
                                label={`${day.charAt(0).toUpperCase() + day.slice(1)}:`}
                                name={day}
                                initialValue={businessTimings[day].split("-").map(timeString => dayjs(timeString, 'hh:mm A'))}
                                style={{ marginBottom: 0 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', float: 'right'}}>
                                    <div>
                                        <TimePicker.RangePicker
                                            rootClassName={'time-picker-timing'}
                                            style={{ marginRight: 10 }}
                                            use12Hours
                                            format="h:mm A"
                                            value={currentData[day]}
                                            defaultValue={businessTimings[day].split("-").map(timeString => dayjs(timeString, 'hh:mm A'))}
                                            disabled={currentData[day] === null}
                                            onChange={(data) => setCurrentData({
                                                ...currentData,
                                                [day]: data
                                            })}
                                        />
                                    </div>
                                    <Form.Item
                                        style={{ marginBottom: 0 }}
                                        name={`${day}_switch`}
                                        valuePropName="checked"
                                    >
                                        <Switch
                                            rootClassName={"time-switch"}
                                            defaultChecked={businessTimings[day] !== 'CLOSED'} onChange={(value) => {
                                            if (!value) {
                                                console.log(day)
                                                setCurrentData({
                                                    ...currentData,
                                                    [day]: null
                                                })
                                            } else {
                                                setCurrentData({
                                                    ...currentData,
                                                    [day]: defaultTimingString.split("-").map(timeString => dayjs(timeString, 'hh:mm A'))
                                                })
                                            }
                                        }}/>
                                    </Form.Item>
                                </div>
                            </Form.Item>
                        </div>
                    ))}
                    <Form.Item>
                        <Button htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>


            )
    );
};

const Timings = ({businessId}) => {
    return (
        <div style={{marginTop: 20}}>
            <p style={{fontSize: '20px'}}>Business Timings</p>
            {businessId ?
                <TimingsForm businessId={businessId}/> :
                <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY_TYPES_ENUM.AREA}/>
            }
        </div>
    );
};

export default Timings;