import React from 'react';

function BespokeButton(props) {
    const labelStyle = { display: 'inline-block', fontSize: '18px' };
    const buttonStyle = { height: '25px', width: '25px' }
    const buttonIcon = props.buttonIcon;
    const label = props.label;
    const classedButtonIcon = React.cloneElement(buttonIcon, { style: buttonStyle });
    return (<span style={{ display: 'flex', alignItems: 'center' }}>{classedButtonIcon}<span style={labelStyle}>{label}</span></span>)
}

export default BespokeButton;