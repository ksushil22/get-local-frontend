import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    useCreateOrUpdateMenuItemMutation,
    useDeleteBusinessItemCategoryMutation,
    useDeleteMenuItemMutation,
    useGetMenuItemsQuery
} from "../../redux/services/businessAPI";
import CustomSpinner, {DISPLAY_TYPES_ENUM, SPINNERS} from "../util/customSpinner/CustomSpinner";
import GetUpload from "../util/upload/GetUpload";
import {Button, Form, Image, Input, List, Space} from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExclamation, faTrash} from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../util/modals/DeleteConfirmationModal";


export default function ({categoryId, editing = false}) {
    const [uploadedImageId, setUploadedImageId] = useState('');
    const [updateItemId, setUpdateItemId] = useState(null);
    const [updateImageFile, setUpdateImageFile] = useState([]);
    const [visibleDeleteCategoryModal, setVisibleDeleteCategoryModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const businessId = useSelector((state) => state.business.businessId);
    const [form] = Form.useForm();

    const rules = [{
        required: true,
        message: "This field is required"
    }];

    const {data: items, isLoading: isLoadingItems} = useGetMenuItemsQuery({businessId, categoryId})
    const [createItem, {isLoading: isCreatingItem}] = useCreateOrUpdateMenuItemMutation();
    const [deleteCategoryMutation, {isLoading: isDeletingCategory}] = useDeleteBusinessItemCategoryMutation();
    const [deleteItemMutation, {isLoading: isDeletingItem}] = useDeleteMenuItemMutation();

    const screens = useBreakpoint();
    const cardMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 50 : 12;
    const cancelButtonTopMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 0 : 20;
    const cancelButtonLeftMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 20 : 0;

    useEffect(() => {
        if (uploadedImageId) {
            form.setFieldValue('imageId', uploadedImageId)
        } else {
            form.setFieldValue('imageId', null)
        }
    }, [uploadedImageId])

    const createItemForm = (<Form
        onFinish={uploadItem}
        form={form}>
        <Form.Item
            rules={rules}
            name={"imageId"}>
            <GetUpload
                accept="image/png, image/jpeg"
                updateInitialList={true}
                maxUploads={1}
                setUploadImageId={setUploadedImageId}
                initialFileList={updateImageFile}/>
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
            <Input autoComplete={"off"} rootClassName={'form-item-input'} placeholder={"Item's Price"}/>
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
                style={menuStyles.formButton} htmlType={"submit"}>{updateItemId ? "Update" : "Create Item"}</Button>
            <Button
                style={{
                    opacity: updateItemId ? 1 : 0,
                    transition: 'all 0.3s ease-in-out',
                    marginLeft: cancelButtonLeftMargin,
                    marginTop: cancelButtonTopMargin,
                    ...menuStyles.formButton
                }}
                onClick={resetUpdateItem}
            >Cancel</Button>
        </Form.Item>
    </Form>)

    const menuList = (<List
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
                    <IconText icon={<FontAwesomeIcon icon={faEdit}/>} text="Edit" key={item.id}
                              callback={() => setupUpdateItem(item)}/>,
                    <IconText icon={<FontAwesomeIcon icon={faTrash}/>} text={"Delete"} key={item.id}
                              callback={() => setDeleteItemId(item.id)}/>
                ] : null}
                extra={
                    <Image
                        style={{width: 200}}
                        alt={item.image?.name}
                        src={item.image?.url}
                    />
                }
            >
                <List.Item.Meta
                    title={item.displayName}
                    description={item.ingredients}
                />
                <p>{item.description}</p>
            </List.Item>
        )}
        locale={{
            emptyText: <>
                <FontAwesomeIcon icon={faExclamation} size={"5x"}/>
                <p>No Item Available</p>
            </>
        }}
    />)

    function uploadItem() {
        createItem({
            businessId: businessId,
            categoryId: categoryId,
            itemDTO: {...form.getFieldsValue(), id: updateItemId}
        }).then(({data, error}) => {
            if (data) {
                form.resetFields();
                setUpdateItemId(null);
                setUpdateImageFile([])
            }
        });
    }

    function resetUpdateItem() {
        setUpdateItemId(null);
        setUploadedImageId(null);
        setUpdateImageFile([]);
        form.resetFields();
    }

    function setupUpdateItem(item) {

        form.resetFields();
        form.setFieldsValue(item);


        setUpdateItemId(item.id);
        if (item.image) {
            setUploadedImageId(item.image.uid);
            setUpdateImageFile([item.image]);
            form.setFieldValue('imageId', item.image.uid);
        }

    }

    const IconText = ({icon, text, callback}) => (
        <Space
            style={{
                cursor: 'pointer'
            }}
            onClick={callback}>
            {icon}
            {text}
        </Space>
    );

    return <>
        {
            editing ?
                <div className={'create-item'}>
                    <Button
                        loading={isDeletingCategory}
                        onClick={() => setVisibleDeleteCategoryModal(true)}
                        style={menuStyles.deleteCategoryButton}>Delete Category</Button>
                    {createItemForm}
                </div> : null
        }
        {
            isLoadingItems ?
                <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY_TYPES_ENUM.AREA}/> :
                menuList
        }
        {
            visibleDeleteCategoryModal && (
                <DeleteConfirmationModal
                    visible={visibleDeleteCategoryModal}
                    handleOk={() => {
                        deleteCategoryMutation({businessId: businessId, categoryId: categoryId})
                        setVisibleDeleteCategoryModal(false)
                    }}
                    handleCancel={() => setVisibleDeleteCategoryModal(false)}
                />
            )
        }
        {
            deleteItemId && (
                <DeleteConfirmationModal
                    visible={!!deleteItemId}
                    handleOk={() => {
                        if (updateItemId === deleteItemId) {
                            resetUpdateItem()
                        }
                        deleteItemMutation({itemId: deleteItemId})
                        setDeleteItemId(null)
                    }}
                    handleCancel={() => setDeleteItemId(null)}
                />
            )
        }

    </>
}

const menuStyles = {
    deleteCategoryButton: {
        float: 'right',
        width: '150px',
        height: '50px',
        background: '#f54242',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        boxShadow: '0 5px 10px 0 rgba(245, 66, 66,0.24),0 5px 10px 0 rgba(245, 66, 66,0.19)'
    },
    formButton: {
        width: '240px',
        height: '50px',
        fontWeight: 'bolder',
        fontSize: '25px',
        color: 'black',
        background: 'none',
        borderRadius: '5px',
        border: 'none',
        boxShadow: '0 5px 10px 0 rgba(0,0,0,0.24),0 5px 10px 0 rgba(0,0,0,0.19)'
    }
}
