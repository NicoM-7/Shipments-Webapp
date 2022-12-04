import React, { useState } from 'react';
import '../../styles/popup.css';

const ClientUpdatePopup = ({ buttonState, client }) => {

    const [inputs, setInputs] = useState({});

    const handleClose = () => {
        buttonState(false);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/clients", { method: "PUT", body: JSON.stringify({ "email": client.email, "name": inputs.name ? inputs.name : null, "phoneNo": inputs.phoneNo ? inputs.phoneNo : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        buttonState(false);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
                buttonState(false);
            });

    };

    return (
        <React.Fragment>
            {
                <React.Fragment>
                    <div className="popup-overlay" />
                    <div className="popup">
                        <button className="popup-close" onClick={handleClose}>X</button>
                        <h1 className='header'>Edit client with email: {client.email}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Name:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                />
                            </label>
                            <label className="form-label">
                                Phone Number:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="phoneNo"
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                            </label>
                            <button className="form-button" type="submit">Update</button>
                        </form>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ClientUpdatePopup;