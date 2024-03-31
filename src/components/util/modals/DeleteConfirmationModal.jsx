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
        <h2>Are you sure?</h2>
    </ModalPopup>
}
