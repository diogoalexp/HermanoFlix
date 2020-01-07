import React from 'react';

import classes from './Profile.module.css';
import noImg from '../../../assets/images/no-image-icon.png';

const card = ( props ) => {
    // const img = props.img != null ? "data:image/png;base64,"+props.img : noImg;
    return (
        <div className={classes.container}>
            <div className={classes.avatarflip}>
                <img src={props.img ? props.img : noImg} height="150" width="150" alt="no img" />
                <img src={props.img2 ? props.img2 : noImg} height="150" width="150" alt="no img"/>
            </div>
            <div>
                <h2 className={classes.title}>{props.title}</h2>
                <h4 className={classes.subTitle}>{props.subTitle}</h4>
                <p className={classes.text}>{props.text}</p>
            </div>
        </div>  
    );
};

export default card;