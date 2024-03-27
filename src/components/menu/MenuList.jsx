import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useCreateOrUpdateMenuItemMutation, useGetMenuItemsQuery} from "../../redux/services/businessAPI";
import CustomSpinner, {DISPLAY_TYPES_ENUM, SPINNERS} from "../util/customSpinner/CustomSpinner";
import GetUpload from "../util/upload/GetUpload";
import {Button, Form, Input, InputNumber, List, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";

export default function ({categoryId, editing = false}) {
    const businessId = useSelector((state) => state.business.businessId);
    const [uploadedImageId, setUploadedImageId] = useState('')
    const [form] = Form.useForm()
    const [updateItemId, setUpdateItemId] = useState(null)
    const rules = [{
        required: true,
        message: "This field is required"
    }];
    const screens = useBreakpoint();

    const {data: items, isLoading: isLoadingItems} = useGetMenuItemsQuery({businessId, categoryId})
    const [createItem, {isLoading: isCreatingItem}] = useCreateOrUpdateMenuItemMutation();

    const cardMargin = screens.md || screens.lg || screens.xl || screens.xxl ?  50 : 12;

    useEffect(() => {
        if (uploadedImageId) {
            form.setFieldValue('imageId', uploadedImageId)
        } else {
            form.setFieldValue('imageId', null)
        }
    }, [uploadedImageId])

    function uploadItem() {
        createItem({
            businessId: businessId,
            categoryId: categoryId,
            itemDTO: {...form.getFieldsValue(), id: updateItemId}
        }).then(({data, error}) => {
            if (data) {
                console.log(data);
                form.resetFields();
                setUpdateItemId(null)
            }
        });
    }

    function setupUpdateItem(item) {
        setUpdateItemId(item.id);
        setUploadedImageId(item.image.uid);
        form.setFieldsValue(item);
    }

    const IconText = ({ icon, text, item }) => (
        <Space
            style={{
                cursor: 'pointer'
            }}
            onClick={() => setupUpdateItem(item)}>
            {React.createElement(icon)}
            {text}
        </Space>
    );


    function deleteCategory() {

    }

    return <>
        {editing ?
            <div className={'create-item'}>
                <Button
                    onClick={deleteCategory}
                    style={{
                    float: 'right',
                    width: '150px',
                    height: '50px',
                    background: '#f54242',
                    color: 'white',
                    borderRadius: '5px',
                    border: 'none',
                    boxShadow: '0 5px 10px 0 rgba(245, 66, 66,0.24),0 5px 10px 0 rgba(245, 66, 66,0.19)'
                }}>Delete Category</Button>
                <Form
                    onFinish={uploadItem}
                    form={form}>
                    <Form.Item
                        rules={rules}
                        name={"imageId"}>
                        <GetUpload maxUploads={1} setUploadImageId={setUploadedImageId}/>
                    </Form.Item>
                    <Form.Item
                        name={"name"}
                        rules={rules}>
                        <Input autoComplete={"off"} rootClassName={'form-item-input'} placeholder={"Item Name"}/>
                    </Form.Item>
                    <Form.Item
                        name={"price"}
                        rules={[...rules,
                            {
                                pattern: /^[0-9]+(?:\.[0-9]+)?$/,
                                message: 'Please enter a valid number!',
                            }]}>
                        <Input autoComplete={"off"} rootClassName={'form-item-input'} placeholder={"Item's Price"} />
                    </Form.Item>
                    <Form.Item
                        name={"ingredients"}>
                        <Input autoComplete={"off"} rootClassName={'form-item-input'} placeholder={"Item's Ingredients"}/>
                    </Form.Item>
                    <Form.Item name={'description'}>
                        <Input autoComplete={"off"} rootClassName={'form-item-input'} placeholder={"Item's Description"}/>

                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={isCreatingItem}
                            style={{
                                width: '240px',
                                height: '50px',
                                fontWeight: 'bolder',
                                fontSize: '25px',
                                color: 'black',
                                background: 'none',
                                borderRadius: '5px',
                                border: 'none',
                                boxShadow: '0 5px 10px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19)'
                            }} htmlType={"submit"}>Create Item</Button>
                    </Form.Item>
                </Form>

            </div> : null}
        {isLoadingItems ?
            <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY_TYPES_ENUM.AREA}/>:
            <List
                itemLayout="vertical"
                size="large"
                dataSource={items}
                renderItem={(item) => (
                    <List.Item
                        className={"item-card"}
                        style={{
                            marginRight: cardMargin,
                            marginLeft: cardMargin
                        }}
                        key={item.id}
                        actions={editing ? [
                            <IconText icon={EditOutlined} text="Edit" key={item.id} item={item}/>,
                        ]: null}
                        extra={
                            <img
                                width={100}
                                alt={item.image.name}
                                src={item.image.url}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={item.description}
                        />
                        {}
                    </List.Item>
                )}
                locale={{
                    emptyText: <>
                        <FontAwesomeIcon icon={faExclamation} size={"5x"} />
                        <p>No Item Available</p>
                    </>
                }}
            />
        }
    </>
}
