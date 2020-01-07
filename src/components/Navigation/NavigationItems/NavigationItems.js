import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/formation">Formação</NavigationItem>
        <NavigationItem link="/experience">Experiência</NavigationItem>
        {/* <NavigationItem link="/career">Carreira</NavigationItem> */}
        {/* <NavigationItem link="/library">Biblioteca</NavigationItem> */}
        {/* {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null} */}
        {/* {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>} */}
    </ul>
);

export default navigationItems;