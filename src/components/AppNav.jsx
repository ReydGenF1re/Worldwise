import React from 'react';
import styles from './AppNav.module.css'
import {NavLink} from "react-router-dom";
function AppNav(props) {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to={'cities'}>Cities</NavLink></li>
                <li><NavLink to={'countries'}>Countries</NavLink></li>
            </ul>
        </nav>
    );
}

export default AppNav;