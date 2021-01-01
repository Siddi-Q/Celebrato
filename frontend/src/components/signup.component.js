import React, { useState } from 'react';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }   

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted!");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleFirstNameChange} placeholder="First Name" required type="" value={firstName} /><br />
            <input onChange={handleLastNameChange} placeholder="Last Name" required type="" value={lastName} /><br />
            <input onChange={handleEmailChange} placeholder="Email" required type="email" value={email} /><br />
            <input onChange={handlePasswordChange} placeholder="Password" required type="password" value={password} /><br />
            <input type="submit" value="Sign up" />
        </form>
    );
}