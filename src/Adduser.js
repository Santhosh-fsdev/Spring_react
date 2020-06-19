import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

const style = {
    div: {
        height: '3rem',
        display: 'inline-block',
        width: '20rem'
    },
    p: {
        margin: '1rem',
        fontFamily: 'sans-serif',
        color: "000000"
    },
    button: {
        outline: 'none',
        color: '444462',
        cursor: 'pointer',
        paddingRight: '0.7rem',
        fontSize: '2rem'

    }
}

const useStyles = makeStyles((theme) => ({

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        color: '#ffffff',
        fontSize: '1rem',
        borderColor: '#ffffff'
    }
}));

export default function Adduser() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        axios({
            url: 'http://localhost:8080/get',
            method: 'get'

        }).then((res) => {
            console.log(res.data)
            setUsers(res.data);
            setLoad(true);
        })
            .catch((err) => console.log(err.message))
    }, [])

    const delete1 = (id) => {
        axios.delete('http://localhost:8080/delete/' + id)
            .then((response) => {
                let newUsers = users.filter(el => el.id !== id);
                setUsers(newUsers);
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    }


    const submit = (e) => {
        e.preventDefault();

        const payload = {
            name,
            role
        }
        axios({
            url: "http://localhost:8080/save",
            method: "post",
            data: payload
        })
            .then((res => {
                window.alert(res.data)
                window.location.reload();
            })
            )
            .catch((err) => window.alert(err.message))
        setName('');
        setRole('');
    }

    return (
        <div>
            <h4> Add user and roles</h4>
            <br />
            <form onSubmit={submit}>
                <TextField type="text" value={name} style={{ margin: '0.5rem', fontColor: "#ffffff !important" }}
                    color="secondary" variant="outlined"
                    InputProps={{
                        className: classes.input
                    }}

                    onChange={(e) => setName(e.target.value)} />
                <TextField type="text" value={role} style={{ margin: '0.5rem' }}
                    variant="outlined"
                    color="secondary"
                    InputProps={{
                        className: classes.input
                    }}

                    onChange={(e) => setRole(e.target.value)} />
                <Button style={{ background: 'red', color: '#ffffff' }} color="secondary" size="small" type="submit" >Submit</Button>
            </form>
            <div style={{ margin: '2rem' }}>
                {load && users.map((user, index) => {
                    return <Grid container
                        spacing={3} style={{ width: '24rem' }}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Paper style={style.div}>
                                <p style={style.p}>{user.name} | {user.role}</p>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} style={{ width: '2rem', marginLeft: '8rem', marginTop: '1rem' }}>
                            <DeleteIcon onClick={() => delete1(user.id)} style={style.button} size="small" />
                        </Grid>
                    </Grid>
                })}
            </div>
        </div>
    )
}