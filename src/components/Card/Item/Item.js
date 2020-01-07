import React from 'react';

import classes from './Item.module.css';
import noImg from '../../../assets/images/no-image-icon.png';

const card = ( props ) => {
    // const img = props.img != null ? "data:image/png;base64,"+props.img : noImg;

    function calcDate(date1,date2) {
        if (!props.calcDate)
            return '';
        let diff = Math.floor(date1.getTime() - date2.getTime());
        let day = 1000 * 60 * 60 * 24;
    
        let days = Math.floor(diff/day);
        let months = Math.floor(days/31);
        let years = Math.floor(months/12);
        months = Math.floor(months - (years * 12)) +1;
        
    
        let message = ' : ';
        if (years > 1)
            message += years + " anos \n"
        if (years === 1)
            message += years + " ano \n"
        if (months > 1)
            message += months + " meses"
        if (months === 1)
            message += months + " mês"

        return message
    }

    let period = '';
    let endDate = "Atualmente";
    let calculatedDate = '';
    if(props.startDate !== null){
        period = props.startDate;
        if(props.endDate !== null){
            calculatedDate = calcDate(new Date(props.endDate), new Date(props.startDate));
            endDate = props.endDate;
        }
        period = props.startDate + " - " + endDate + calculatedDate;
    }

    return (
        <div className={classes.container}>
            <div className={classes.dateHeader}>
                <label>{period}</label>
            </div>
            <div className={classes.avatarflip}>
                <img src={props.img ? props.img : noImg} height="150" width="150" alt="no img"/>
                <img src={props.img ? props.img : noImg} height="150" width="150" alt="no img"/>
            </div>
            <div className={classes.content2}>
                <h2 className={classes.title}>{props.title}</h2>
                <h4 className={classes.subTitle}>{props.subTitle}</h4>
                <p className={classes.text}>{props.text}</p>
            </div>
            <div className={classes.dateFooter} >
                <label>{period}</label>
            </div>
        </div> 
    );
};

export default card;