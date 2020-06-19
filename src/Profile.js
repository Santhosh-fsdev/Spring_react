import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Adduser from './Adduser';
export default function Profile() {

    const [details, setDetails] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8082/micro")
            .then(response => {
                console.log(response.data);
                setDetails(response.data[0]);
                setLoad(true);
                console.log(details);
            })

    }, [])
    return (
        <div>
            {load ? <div style={{ color: "#ffffff", margin: "3rem" }}>
                <h4>Profile Details</h4>
                <hr style={{ background: "#ffffff" }} />
                <br />
        Name : <h3>{details.data}</h3>
        Mail-Id :<h3>{details.email}</h3>
        Mobile :<h3>{details.mobile}</h3>
                <br />
                <hr style={{ background: "#ffffff" }} />
                <Adduser /> </div> : <CircularProgress color="secondary" />}
        </div>

    )
}