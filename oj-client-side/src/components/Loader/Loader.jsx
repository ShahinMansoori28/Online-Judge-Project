import React from 'react'
import classes from './Loader.module.css'

const Loader = () => {
    return (
        <div className={classes.psoload}>
            <div className={classes.straight}></div>
            <div className={classes.curve}></div>
            <div className={classes.center}>
                <div className={classes.loadingtext}>LOADING</div>
            </div>
            <div className={classes.inner}></div>
        </div>
    )
}

export default Loader