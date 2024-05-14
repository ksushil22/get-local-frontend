import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Typography, Upload} from "antd";
import ModalPopup from "../modals/ModalPopup";
import "./upload.css";
import {useDeleteImageMutation, useGetBusinessImagesQuery} from "../../../redux/services/businessAPI";
import CustomSpinner, {DISPLAY, SPINNERS} from "../customSpinner/CustomSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

const {Text} = Typography;

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
 * @param setUploadImageId - for setting up the image id for further use.
 * @param accept - MIME types for Upload to accept file types.
 * @param type - Type of image that belongs to the business: CAROUSEL, MENU, etc
 * @param listType - picture-card, picture
 * @param initialFileList - initial images.
 * @param updateInitialList - do we need to update the initial List or not
 * @returns {JSX.Element}
 */
export default function ({
                             style = {},
                             maxUploads = 1,
                             setUploadImageId = null,
                             accept = '',
                             type = "MENU",
                             listType = 'picture-card',
                             initialFileList = null,
                             updateInitialList = false
                         }) {
    const businessId = useSelector((state) => state.business.businessId)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [deleteFile, setDeleteFile] = useState(false);
    const [deleteUid, setDeleteUid] = useState("");
    const {
        data: images,
        isLoading: loadingImages
    } = useGetBusinessImagesQuery({businessId, type}, {skip: type === "MENU"});
    const [deleteImage] = useDeleteImageMutation();
    const handleCancel = () => {
        setPreviewOpen(false);
        setDeleteFile(false);
    };

    useEffect(() => {
        if (updateInitialList) {
            setFileList(initialFileList);
        }
    }, [initialFileList, updateInitialList, setFileList]);

    useEffect(() => {
        if (images) {
            const formattedImages = images.map((image) => ({
                uid: image.id,
                name: image.name,
                status: 'done',
                url: `data:${image.extension};base64,${image.image}`,
            }));
            setFileList(formattedImages);
        }
    }, [images]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = ({file: file, fileList: newFileList}) => {
        if (file.status !== 'removed' && file.status === 'uploading') {
            setFileList(newFileList);
        }
        if (file.status === 'done') {
            const fileList = newFileList.filter(item => !item.uid.startsWith('rc-upload'))
            getBase64(file.originFileObj).then(result => {
                fileList.push({
                    uid: file.response.message,
                    status: 'done',
                    url: result,
                    name: file.name
                });
                setFileList(fileList)
            })
            if (setUploadImageId)
                setUploadImageId(file.response.message);
        }
    };


    const handleCustomFileChange = () => {
        setFileList(fileList.filter(file => file.uid !== deleteUid));
    }

    const handleDelete = async () => {
        deleteImage(deleteUid).then(({data, error}) => {
            if (data) {
                handleCustomFileChange();
                if (setUploadImageId) {
                    setUploadImageId(null)
                }
            }
        });
        setDeleteFile(false)
        setPreviewOpen(false)

    }

    if (loadingImages) {
        return <CustomSpinner
            spinner={SPINNERS.SKELETON}
            display={DISPLAY.AREA}/>
    }

    return (
        <div style={style}>
            <Upload
                action={`${process.env.BASE_API_URL}business/${businessId}/upload/${type}/`}
                headers={{
                    'Authorization': `Bearer ${sessionStorage.getItem("access")}`
                }}
                accept={accept}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => {
                    handlePreview(file)
                    setDeleteUid(file.uid)
                    setDeleteFile(true)
                }}
                style={{cursor: "pointer"}}
            >
                {fileList.length >= maxUploads ? null : (
                    <div>
                        <div style={{marginTop: 8}}>Upload</div>
                        <FontAwesomeIcon icon={faCloudArrowUp} fontSize={"larger"}/>
                    </div>
                )}
            </Upload>
            <ModalPopup
                type={deleteFile ? "warning" : "success"}
                visible={previewOpen || deleteFile}
                title={deleteFile ? `Delete: ${previewTitle}` : previewTitle}
                footer={null}
                showCancel={deleteFile}
                handleCancel={handleCancel}
                submitButtonText={deleteFile ? 'Delete' : null}
                handleOk={deleteFile ? handleDelete : null}
            >
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
                {deleteFile && (<Text type="danger">Deletion of the item is irreversible.</Text>)}
            </ModalPopup>
        </div>
    );
}

