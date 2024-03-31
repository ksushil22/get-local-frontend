import React, { memo } from 'react';
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';

function ModalPopup(
    {
        title,
        visible,
        handleOk,
        handleCancel,
        type,
        children,
        footer,
        closable,
        submitButtonText,
        showTitleIcon=true,
        showCancel=true,
        disableScreenTouch = true
    }
) {
    let icon = null;

    switch (type) {
        case "info":
            icon = <InfoCircleOutlined style={{ color: 'var(--primary-color)' }} />;
            break;
        case "success":
            icon = <CheckCircleOutlined style={{ color: 'green' }} />;
            break;
        case "warning":
            icon = <ExclamationCircleOutlined style={{ color: 'red' }} />;
            break;
        default:
            icon = <InfoCircleOutlined style={{ color: 'var(--primary-color)' }} />;
            break;
    }
    const customFooter = (handleOk || handleCancel || footer) ? (
        <div>
            {footer}
            {handleCancel && showCancel ? <Button type={"text"} onClick={handleCancel}>
                Cancel
            </Button>: null}
            {handleOk ? <Button type={"default"} onClick={handleOk}>
                {submitButtonText ? submitButtonText : 'Submit'}
            </Button> : null}

        </div>
    ): null



    return (
        <Modal
            title={title === null ? null :
                (<div style={modalButtonStyle.title}>
                    {showTitleIcon ? <span style={modalButtonStyle.iconStyle}>{icon}</span> : null}
                    {title}
                </div>)}
            onCancel={handleCancel}
            open={visible}
            footer={customFooter}
            maskClosable={!disableScreenTouch}
            centered={true}
            children={children}
            closable={closable}
            styles={{
                mask: {
                    backdropFilter: 'blur(1.5px)',
                },
                body: {
                    textAlign: 'center'
                }
            }}
        >
        </Modal>
    );
}

export default memo(ModalPopup);

const modalButtonStyle = {
    title: {
        fontSize: '1.5em',
        textAlign: 'center',
    },
    iconStyle: {
        marginRight: '1em'
    }
};
