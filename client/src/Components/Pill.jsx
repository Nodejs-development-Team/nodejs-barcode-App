import React from 'react'


export const Pill = ({color, leftText, rightText, size, isActive, onClick}) => {

    const wrapClassName = `flexWrap pillButtonWrapper absolute fullDim ${isActive ? "active" : ""}`
    let rightClassName = isActive ? "flex-item" : 'flex-item none'

    return <div className={`center flexWrap pill relative ${size}`} style={{backgroundColor: color}}>
        <div onClick={onClick} className={wrapClassName}>
            <div className={rightClassName}/>
            <div className="pillButton"/>
        </div>
        <div className="fullWidth flexWrap evenlySpaced">
            <span>{leftText}</span>
            <span>{rightText}</span>
        </div>
    </div>

}