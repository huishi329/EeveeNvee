import React, { useState } from 'react';
import { createSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function SpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const spotData = {
            address,
            city,
            state,
            country,
            lat: 48,
            lng: 120,
            name,
            description,
            price
        };
        return dispatch(createSpot(spotData, imgURL, history))
            .then(() => setShowModal(false))
            // .then(() => history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a spot</h2>
            <div>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <input
                placeholder='Address'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
            />
            <input
                placeholder='City'
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
            />
            <input
                placeholder='State'
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
            />
            <input
                placeholder='Country'
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
            <input
                placeholder='Name'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <input
                placeholder='Price'
                min='0'
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                placeholder='Preview Image'
                type="url"
                value={imgURL}
                onChange={(e) => setImgURL(e.target.value)}
                required
                style={{ borderRadius: '0 0 0.5rem 0.5rem' }}
            />
            <button type="submit">Submit</button>
        </form >
    );
}

export default SpotForm;
