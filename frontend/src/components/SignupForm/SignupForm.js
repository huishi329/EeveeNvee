import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import styles from './SignupForm.module.css';

export default function SignupForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const errors = [];

    await dispatch(sessionActions.signupUser({ email, username, password, firstName, lastName }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) errors.push(...Object.values(data.errors));
      });

    if (password !== confirmPassword) errors.push(['Confirm Password field must be the same as the Password field']);

    setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <h2>Welcome to Eeveenvee</h2>
      <div className='errors-div'>
        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
      </div>
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
      />

      <input
        placeholder="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        placeholder="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
      />

      <button className={styles.button} type="submit">Continue</button>
    </form >
  );
}
