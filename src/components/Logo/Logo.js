import React from 'react';

import pcLogo from '../../assets/images/h2.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={pcLogo} alt="diogoalexp" />
    </div>
);

export default logo;