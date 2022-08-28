import React from "react";
import { Link } from "react-router-dom";
import classes from './Slash.module.css';
import { Button } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';

function Slash(props) {
    return (
        <div className={classes.body}>
            <div className={classes.heading}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.underName}>
                    <div className={classes.une} diff={props.difficulty}>{props.difficulty}</div>
                    <div className={classes.une}>Submitions : {props.noOfSubmissions}</div>
                    {props.noOfSubmissions !== 0 ?
                        <div className={classes.une}>Success : {((props.noOfSuccess / props.noOfSubmissions) * 100).toFixed(2)}</div>
                        : <div className={classes.une}>Success : {props.noOfSuccess}</div>
                    }
                </div>
            </div>
            <div className={classes.btnbtncover}>
                <Button
                    className={classes.btnbtn}
                    LinkComponent={Link}
                    to={`/problem/${props.id}`}
                    variant="outlined"
                    endIcon={<CodeIcon style={{ fontSize: '1.4rem', marginLeft: '0.4rem' }} />}
                >
                    Solve
                </Button>
            </div>
        </div>
    );
}

export default Slash;
