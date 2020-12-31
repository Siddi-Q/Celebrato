import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
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
            <input onChange={onChangeEmail} placeholder="Email" required type="email" value={email}/><br />
            <input onChange={onChangePassword} placeholder="Password" required type="password" value={password} /><br />
            <input type="submit" value="Log in" />
        </form>
    );
}