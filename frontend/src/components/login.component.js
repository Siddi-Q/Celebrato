import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={handleEmailChange} placeholder="Email" required type="email" value={email}/><br />
            <input onChange={handlePasswordChange} placeholder="Password" required type="password" value={password} /><br />
            <input type="submit" value="Log in" />
        </form>
    );
}