import React from 'react';

const TeamTemplate1 = ({businessId}) => {
    return <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'flex-start',
        flexWrap: "wrap"
    }}>
        <div className={'heading'} style={{
            width: '100%'
        }}>
            <h1 style={{
                textAlign: 'center'
            }}>Meet our team</h1>
        </div>
    </div>
}

export default TeamTemplate1;
