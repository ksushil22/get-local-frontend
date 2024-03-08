import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Modal, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ModalPopup from "../ModalPopup";
import "./upload.css"
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

/**
 *
 * @param style
 * @param maxUploads - max number of uploads: could be either 1 or 8, or upto you
 * @param accept - MIME types for Upload to accept file types.
 * @returns {JSX.Element}
 */
export default function ({style= {}, maxUploads=1, accept=''}) {
    const businessId = useSelector((state)=> state.business.businessId)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
                cursor: 'pointer'
            }}
            type="button"
        >
            <FontAwesomeIcon icon={faUpload} />
        </button>
    );
    return (
        <div style={style}>
            <Upload
                accept={accept}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                progress={{
                    strokeColor: {
                        '0%': '#dedede',
                        '100%': '#614044',
                    },
                    strokeWidth: 3,
                }}
                style={{
                    cursor: 'pointer'
                }}
            >
                {fileList.length >= maxUploads ? null : uploadButton}
            </Upload>
            <ModalPopup
                type={'success'}
                visible={previewOpen} title={previewTitle} footer={null} handleCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </ModalPopup>
        </div>
    );
}
