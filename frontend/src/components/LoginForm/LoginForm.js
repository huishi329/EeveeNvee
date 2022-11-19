import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';


function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.loginUser({ credential, password }))
            .then(() => setShowModal(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <div className='errors-div'>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <input
                placeholder='Username or Email'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
            />
            <input
                placeholder=' Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
            />

            <button type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;
