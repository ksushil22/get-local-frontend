import React from "react";
import ModalPopup from "./ModalPopup";

export default function ({
    visible,
    handleOk,
    handleCancel
}) {
    return <ModalPopup
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        type={'warning'}
        closable={true}
        submitButtonText={"Delete"}
        showTitleIcon={true}
        showCancel={true}
        disableScreenTouch={true}
    >
        <p>Are you Sure you want to proceed with the deletion process?</p>
    </ModalPopup>
}
