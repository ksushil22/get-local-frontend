import React from 'react';
import {COLORS} from "./constants";


export const IconLink = ({text, href, icon, showIcon, color, className}) => {
    return <span>
        <a
            className={className || 'icon-text'}
            href={href}
            target={"_blank"}
            style={{
                color: color || COLORS.PRIMARY_BACKGROUND,
                flex: '1 1 auto',

            }}> {showIcon ? icon : <span>{icon} {text} </span>} </a>
    </span>

}
