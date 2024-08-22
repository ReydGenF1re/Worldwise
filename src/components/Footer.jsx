import React from 'react';
import styles from './Footer.module.css'
function Footer(props) {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
            </p>
        </footer>
    );
}

export default Footer;